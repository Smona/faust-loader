import { AudioContext } from "standardized-audio-context";
import createCompressor from "./Compressor.dsp";

const ctx = new AudioContext();
createCompressor(ctx).then((node) => {
  console.log(node);
  console.log(node.getParams());
});
