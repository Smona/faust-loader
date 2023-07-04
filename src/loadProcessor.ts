import { IAudioContext } from "standardized-audio-context";
import getClass from "./FaustAudioProcessorNode";

function heap2Str(buf: Uint8Array) {
  let str = "";
  let i = 0;
  while (buf[i] !== 0) {
    str += String.fromCharCode(buf[i++]);
  }
  return str;
}

async function loadProcessorModule(context: IAudioContext, url: string) {
  if (!context.audioWorklet) {
    console.error(
      "Error loading FaustAudioProcessorNode: standardized-audio-context AudioWorklet isn't supported in this environment."
    );
    return null;
  }
  const processorBlob = await (await fetch(url)).blob();
  const processorURL = URL.createObjectURL(processorBlob);
  // The audio worklet handles caching of modules by URL in the same context.
  // Adding an already-loaded module to a different context will trigger another
  // network request, but the browser cache should catch it.
  return context.audioWorklet.addModule(processorURL);
}

const wasmModules: Record<string, Promise<WebAssembly.Module>> = {};
async function getWasmModule(url: string) {
  const existing = wasmModules[url];

  if (existing) {
    return existing;
  }

  wasmModules[url] = fetch(url)
    .then((response) => response.arrayBuffer())
    .then((dspBuffer) => WebAssembly.compile(dspBuffer));
  return wasmModules[url];
}

const importObject = {
  env: {
    memoryBase: 0,
    tableBase: 0,
    _abs: Math.abs,

    // Float version
    _acosf: Math.acos,
    _asinf: Math.asin,
    _atanf: Math.atan,
    _atan2f: Math.atan2,
    _ceilf: Math.ceil,
    _cosf: Math.cos,
    _expf: Math.exp,
    _floorf: Math.floor,
    _fmodf: (x: number, y: number) => x % y,
    _logf: Math.log,
    _log10f: Math.log10,
    _max_f: Math.max,
    _min_f: Math.min,
    _remainderf: (x: number, y: number) => x - Math.round(x / y) * y,
    _powf: Math.pow,
    _roundf: Math.fround,
    _sinf: Math.sin,
    _sqrtf: Math.sqrt,
    _tanf: Math.tan,
    _acoshf: Math.acosh,
    _asinhf: Math.asinh,
    _atanhf: Math.atanh,
    _coshf: Math.cosh,
    _sinhf: Math.sinh,
    _tanhf: Math.tanh,

    // Double version
    _acos: Math.acos,
    _asin: Math.asin,
    _atan: Math.atan,
    _atan2: Math.atan2,
    _ceil: Math.ceil,
    _cos: Math.cos,
    _exp: Math.exp,
    _floor: Math.floor,
    _fmod: (x: number, y: number) => x % y,
    _log: Math.log,
    _log10: Math.log10,
    _max_: Math.max,
    _min_: Math.min,
    _remainder: (x: number, y: number) => x - Math.round(x / y) * y,
    _pow: Math.pow,
    _round: Math.fround,
    _sin: Math.sin,
    _sqrt: Math.sqrt,
    _tan: Math.tan,
    _acosh: Math.acosh,
    _asinh: Math.asinh,
    _atanh: Math.atanh,
    _cosh: Math.cosh,
    _sinh: Math.sinh,
    _tanh: Math.tanh,

    table: new WebAssembly.Table({ initial: 0, element: "anyfunc" }),
  },
};

export default async function loadProcessor(
  context: IAudioContext,
  name: string,
  wasmUrl: string,
  processorUrl: string
) {
  const [dspModule] = await Promise.all([
    getWasmModule(wasmUrl),
    loadProcessorModule(context, processorUrl),
  ]);

  const dspInstance = await WebAssembly.instantiate(dspModule, importObject);

  const HEAPU8 = new Uint8Array(dspInstance.exports.memory.buffer);
  const json = heap2Str(HEAPU8);
  const json_object = JSON.parse(json);
  const processorOptions = { wasm_module: dspModule, json: json };

  const nodeOptions = {
    numberOfInputs: parseInt(json_object.inputs) > 0 ? 1 : 0,
    numberOfOutputs: parseInt(json_object.outputs) > 0 ? 1 : 0,
    channelCount: Math.max(1, parseInt(json_object.inputs)),
    outputChannelCount: [parseInt(json_object.outputs)],
    channelCountMode: "explicit" as const,
    channelInterpretation: "speakers" as const,
    processorOptions,
  };

  const FaustAudioProcessorNode = getClass();
  if (!FaustAudioProcessorNode) {
    console.error(
      "Error loading FaustAudioProcessorNode: Web audio API isn't supported in this environment."
    );
    return null;
  }

  try {
    const node = new FaustAudioProcessorNode(context, name, nodeOptions);
    node.onprocessorerror = () => {
      console.log(`An error from ${name}-processor was detected.`);
    };

    return node;
  } catch (e) {
    console.error(
      "FaustAudioProcessorNode initialization failed: make sure you are passing a standardized-audio-context AudioContext."
    );
    console.error(e);
  }
}
