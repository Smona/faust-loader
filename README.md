# faust-loader

Import [Faust](https://faust.grame.fr/) .dsp files, and get back an AudioWorklet or ScriptProcessor node.

Bundles faust2wasm from Faust 2.30.5

**Note: this library is still in development, and is not ready for production usage yet**

## Installation

1. Install the Faust compiler. This package bundles the `faust2wasm` tool needed to generate output files,
   so a minimal compiler install should be sufficient. Libfaust is available from many package managers (including
   Ubuntu, Arch and Debian) and on [many platforms](https://faust.grame.fr/downloads/).

2. Install faust-loader:

- `npm install --save-dev faust-loader`
- `yarn add -D faust-loader`

3. Add faust-loader to your webpack config:

```
module: {
    rules: [
    // ...
      {
        test: /\.dsp$/,
        use: [
          {
            loader: "faust-loader",
            options: {
              outputPath: "processors",       // Where the generated files will be placed relative to the output directory
              publicPath: "/build/processors" // Where the generated files will be served from
            }
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
createCompressor(context).then((node) => {
  node.connect(context.destination);
  node.getParams();
  node.setParam("attack", 0.3);
});
```

faust-loader makes use of [standardized-audio-context](https://github.com/chrisguttandin/standardized-audio-context) for
instantiating AudioWorkletNodes. This allows it to automatically fallback to a ScriptProcessorNode on Safari and other
browsers that don't support AudioWorklets, as well as interoperate seamlessly with [Tone.js](https://github.com/Tonejs/Tone.js), a popular web audio framework.

Because of this, you have to use an AudioContext from `standardized-audio-context` when creating Faust nodes. If you want
to use this loader with a vanilla AudioContext, please submit an issue or PR!
