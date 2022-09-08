import { AudioContext, OfflineAudioContext } from "standardized-audio-context";
import createCompressor from "./TestSynth.dsp";

const ctx = new AudioContext();
const ctx2 = new AudioContext();
const offline = new OfflineAudioContext({
  length: 4 * 44_100,
  numberOfChannels: 2,
  sampleRate: 44_100,
});

Promise.all([
  createCompressor(ctx),
  createCompressor(ctx),
  createCompressor(ctx),
]).then(async (nodes) => {
  console.log(nodes);
  const [test] = nodes;
  if (!test) throw new Error("Node instantiation failed.");

  assert(test.getNumInputs() === 0);
  assert(test.getNumOutputs() === 1);

  // Second AudioContext tests
  const test2 = await createCompressor(ctx2);
  if (!test2) throw new Error("Node instantiation failed.");
  console.log(test2);
  test2.connect(ctx2.destination);

  // OfflineAudioContext tests
  const testOffline = await createCompressor(offline);
  if (!testOffline) throw new Error("Node instantiation failed.");
  console.log(testOffline);
  testOffline.connect(offline.destination);
  const buffer = await offline.startRendering();

  console.log("🎉 All tests passed");

  // Wire up audio QA controls

  document.getElementById("start")?.addEventListener("click", () => {
    ctx2.resume();
    test2.connect(ctx2.destination);
  });
  document.getElementById("stop")?.addEventListener("click", () => {
    test2.disconnect();
  });
  document.getElementById("playback")?.addEventListener("click", () => {
    ctx2.resume();
    const bufferNode = ctx2.createBufferSource();
    bufferNode.buffer = buffer;
    bufferNode.connect(ctx2.destination);
    bufferNode.start();

    test2.disconnect();
  });
});

function assert(condition: boolean, message = "Test failed!") {
  if (!condition) throw new Error(message);
}
