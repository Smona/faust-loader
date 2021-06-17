# faust-loader

Import [Faust](https://faust.grame.fr/) .dsp files, and get back an AudioWorklet or ScriptProcessor node.

## Installation

1. Install the Faust compiler:
  - on Arch: `sudo pacman -S faust`
  - Ubuntu: `sudo apt-get update && sudo apt-get install faust`
1. Install faust-loader:
  - `npm install --save-dev faust-loader`
  - `yarn add -D faust-loader`
1. Add faust-loader to your webpack config:
```
module: {
    rules: [
    // ...
      {
        test: /\.dsp$/,
        use: [
          {
            loader: "faust-loader",
          },
        ],
      },
    ],
  },
```

## Usage
```ts
import { AudioContext } from "standardized-audio-context";
import createCompressor from "./Compressor.dsp";

const context = new AudioContext();
createCompressor(context).then(node => {
  node.connect(context.destination);
  node.getParams();
  node.setParam("attack", 0.3);
});
```

faust-loader makes use of [standardized-audio-context](https://github.com/chrisguttandin/standardized-audio-context) for
instantiating AudioWorkletNodes. This allows it to automatically fallback to a ScriptProcessorNode on Safari and other
browsers that don't support AudioWorklets, as well as interoperate seamlessly with [Tone.js], a popular web audio framework.

Because of this, you have to use an AudioContext from `standardized-audio-context` when creating Faust nodes. If you want
to use this loader with a vanilla AudioContext, please submit an issue or PR!
