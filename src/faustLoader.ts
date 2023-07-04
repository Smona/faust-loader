import { getOptions, interpolateName } from "loader-utils";
import { LoaderDefinitionFunction } from "webpack";
import util from "util";
import path from "path";
import { exec as execCallback } from "child_process";
const exec = util.promisify(execCallback);
import fs from "fs-extra";
import tmp from "tmp-promise";

interface Options {
  inline?: boolean;
  outputPath?: string;
  publicPath?: string;
}

export interface FaustAudioProcessorNode extends AudioWorkletNode {
  getNumInputs(): number;
  getNumOutputs(): number;
  getParam(address: string): number;
  getParams(): string[];
  setParam(address: string, value: number): void;
  getJson(): string;
  getState(): Promise<Record<string, number>>;
  destroy(): void;
}

export type ProcessorLoader = (
  context: any
) => Promise<FaustAudioProcessorNode | null | undefined>;

function toDataURL(content: Buffer, type = "application/octet-stream") {
  const data = content.toString("base64");
  return `data:${type};base64,${data}`;
}

const faustLoader: LoaderDefinitionFunction<Options> = async function (
  content
) {
  const options: Options = getOptions(this);
  const { inline = false, outputPath = "", publicPath = "/" } = options;
  const context = this.rootContext;
  const workDir = await tmp.dir();

  const faust2wasmPath = await new Promise<string>((res) => {
    this.resolve(context, "faust-loader", (err, result) => {
      if (err) throw err;
      if (typeof result !== "string")
        throw new Error("Unable to find faust2wasm command");

      res(path.resolve(result, "../../faust2appls"));
    });
  });

  await fs.copy(faust2wasmPath, workDir.path);

  const dspName = interpolateName(this, "[name]", { content, context });
  const dspPath = path.resolve(workDir.path, dspName);

  await fs.writeFile(dspPath, content);
  const { stderr } = await exec(`./faust2wasm -worklet ${dspPath}`, {
    cwd: workDir.path,
  });
  if (stderr) this.emitError(new Error(stderr));

  const wasmName = interpolateName(this, "[name].wasm", { context, content });
  const wasmPath = path.resolve(workDir.path, wasmName);
  const wasmContent = await fs.readFile(wasmPath);

  const processorName = interpolateName(this, "[name]-processor.js", {
    context,
    content,
  });
  const processorPath = path.resolve(workDir.path, processorName);
  const processorContent = await fs.readFile(processorPath, {
    encoding: "utf8",
  });
  const cleanedProcessorContent = processorContent.replace(
    /console\.log\(this\);/,
    ""
  );

  // Emit scripts if they shouldn't be embedded
  if (!inline) {
    this.emitFile(path.join(outputPath, wasmName), wasmContent);
    this.emitFile(
      path.join(outputPath, processorName),
      cleanedProcessorContent
    );
  }

  const importPath = await new Promise((res) => {
    this.resolve(context, "faust-loader", (err, result) => {
      if (err) throw err;
      if (typeof result !== "string")
        throw new Error("Unable to find faust2wasm command");

      res(path.resolve(result, "../loadProcessor.js"));
    });
  });

  const cleanedBaseURL = publicPath.endsWith("/")
    ? publicPath
    : `${publicPath}/`;

  const wasmURL = inline
    ? toDataURL(wasmContent)
    : `${cleanedBaseURL}${dspName}.wasm`;
  const processorURL = inline
    ? toDataURL(Buffer.from(cleanedProcessorContent), "text/javascript")
    : `${cleanedBaseURL}${dspName}-processor.js`;

  return `
  import loadProcessor from "${importPath}";

  function create${dspName}Node(context) {
    return loadProcessor(
      context,
      "${dspName}",
      "${wasmURL}",
      "${processorURL}"
    )
  }

  export default create${dspName}Node;
`;
};

export default faustLoader;
