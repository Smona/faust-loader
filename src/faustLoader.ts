import { getOptions, interpolateName } from "loader-utils";
import { LoaderDefinitionFunction } from "webpack";
import util from "util";
import path from "path";
import os from "os";
import { exec as execCallback } from "child_process";
const exec = util.promisify(execCallback);
import { promises as fs } from "fs";

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

  const dspName = interpolateName(this, "[name]", { content, context });
  const dspPath = path.resolve(os.tmpdir(), dspName);

  await fs.writeFile(dspPath, content);
  const { stderr } = await exec(`faust2wasm -worklet ${dspPath}`, {
    cwd: os.tmpdir(),
  });
  if (stderr) this.emitError(new Error(stderr));

  const wasmName = interpolateName(this, "[name].wasm", { context, content });
  const wasmPath = path.resolve(os.tmpdir(), `${dspName}.wasm`);
  const wasmContent = await fs.readFile(wasmPath);
  // TODO: this method should accept a buffer
  // PR: https://github.com/webpack/webpack/pull/13577
  this.emitFile(path.join(outputPath, wasmName), wasmContent);

  const processorName = interpolateName(this, "[name]-processor.js", {
    context,
    content,
  });
  const processorPath = path.resolve(os.tmpdir(), `${dspName}-processor.js`);
  const processorContent = await fs.readFile(processorPath);
  this.emitFile(path.join(outputPath, processorName), processorContent);

  // Clean up temporary files
  await Promise.all([
    fs.unlink(dspPath),
    fs.unlink(wasmPath),
    fs.unlink(processorPath),
    fs.unlink(path.resolve(os.tmpdir(), `${dspName}.js`)),
  ]);

  return `
  import loadProcessor from "../dist/loadProcessor.js";

  function create${dspName}Node(context) {
    return loadProcessor(context, "${dspName}", "${publicPath}")
  }

  export default create${dspName}Node;
`;
};

export default faustLoader;
