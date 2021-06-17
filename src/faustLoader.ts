import { getOptions, interpolateName } from "loader-utils";
import { LoaderDefinitionFunction } from "webpack";
import util from "util";
import path from "path";
import os from "os";
import { exec as execCallback } from "child_process";
const exec = util.promisify(execCallback);
import fs from "fs-extra";

interface Options {
  outputPath?: string;
  publicPath?: string;
}

const faustLoader: LoaderDefinitionFunction<Options> = async function (
  content
) {
  const options: Options = getOptions(this);
  const { outputPath = "", publicPath = "/" } = options;
  const context = this.rootContext;
  const faust2wasmPath = await new Promise<string>((res) => {
    this.resolve(context, "faust-loader", (err, result) => {
      if (err) throw err;
      if (typeof result !== "string")
        throw new Error("Unable to find faust2wasm command");

      res(path.resolve(result, "../../faust2appls"));
    });
  });
  const workDirPath = path.resolve(os.tmpdir(), "faust2appls");

  await fs.copy(faust2wasmPath, workDirPath, {
    overwrite: false,
  });

  const dspName = interpolateName(this, "[name]", { content, context });
  const dspPath = path.resolve(workDirPath, dspName);

  await fs.writeFile(dspPath, content);
  const { stderr } = await exec(`./faust2wasm -worklet ${dspPath}`, {
    cwd: workDirPath,
  });
  if (stderr) this.emitError(new Error(stderr));

  const wasmName = interpolateName(this, "[name].wasm", { context, content });
  const wasmPath = path.resolve(workDirPath, `${dspName}.wasm`);
  const wasmContent = await fs.readFile(wasmPath);
  // TODO: this method should accept a buffer
  // PR: https://github.com/webpack/webpack/pull/13577
  this.emitFile(path.join(outputPath, wasmName), wasmContent);

  const processorName = interpolateName(this, "[name]-processor.js", {
    context,
    content,
  });
  const processorPath = path.resolve(workDirPath, `${dspName}-processor.js`);
  const processorContent = await fs.readFile(processorPath);
  this.emitFile(path.join(outputPath, processorName), processorContent);

  await Promise.all([
    fs.remove(dspPath),
    fs.remove(path.resolve(workDirPath, `${dspName}.js`)),
    fs.remove(wasmPath),
    fs.remove(processorPath),
  ]);

  const importPath = await new Promise((res) => {
    this.resolve(context, "faust-loader", (err, result) => {
      if (err) throw err;
      if (typeof result !== "string")
        throw new Error("Unable to find faust2wasm command");

      res(path.resolve(result, "../loadProcessor.js"));
    });
  });

  return `
  import loadProcessor from "${importPath}";

  function create${dspName}Node(context) {
    return loadProcessor(context, "${dspName}", "${publicPath}")
  }

  export default create${dspName}Node;
`;
};

export default faustLoader;
