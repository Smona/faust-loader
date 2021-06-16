const { getOptions, interpolateName } = require("loader-utils");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs").promises;

module.exports = async function (content) {
  const options = getOptions(this);
  var callback = this.async();
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

  callback(
    null,
    `
  import loadProcessor from "../dist/loadProcessor.js";

  function create${dspPath}Node(context) {
    return loadProcessor(context, "${dspPath}")
  }

  export default create${dspPath}Node;
`
  );
};
