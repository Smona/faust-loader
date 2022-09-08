import { AudioContext } from "standardized-audio-context";
import createCompressor from "./Compressor.dsp";

const ctx = new AudioContext();
Promise.all([
  createCompressor(ctx),
  createCompressor(ctx),
  createCompressor(ctx),
]).then((nodes) => {
  console.log(nodes);
});
