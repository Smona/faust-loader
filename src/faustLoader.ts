import { getOptions, interpolateName } from "loader-utils";
import { LoaderDefinitionFunction } from "webpack";
import util from "util";
import { exec as execCallback } from "child_process";
const exec = util.promisify(execCallback);
import { promises as fs } from "fs";

const faustLoader: LoaderDefinitionFunction = async function (content) {
  const options = getOptions(this);
  const context = options.context || this.rootContext;

  const dspPath = interpolateName(this, "[name]", { content, context });
  await fs.writeFile(dspPath, content);
  const { stderr } = await exec(`faust2wasm -worklet ${dspPath}`);
  if (stderr) this.emitError(stderr);
  await fs.unlink(dspPath);

  const wasmName = interpolateName(this, "[name].wasm", { context, content });
  const wasmContent = await fs.readFile(`${dspPath}.wasm`);
  this.emitFile(wasmName, wasmContent);

  const processorName = interpolateName(this, "[name]-processor.js", {
    context,
    content,
  });
  const processorContent = await fs.readFile(`${dspPath}-processor.js`);
  this.emitFile(processorName, processorContent);

  await fs.unlink(`${dspPath}.wasm`);
  await fs.unlink(`${dspPath}-processor.js`);
  await fs.unlink(`${dspPath}.js`);

  return `
  import loadProcessor from "../dist/loadProcessor.js";

  function create${dspPath}Node(context) {
    return loadProcessor(context, "${dspPath}")
  }

  export default create${dspPath}Node;
`;
};

export default faustLoader;
