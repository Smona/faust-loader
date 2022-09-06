# faust-loader

Import [Faust](https://faust.grame.fr/) .dsp files, and get back an AudioWorklet or ScriptProcessor node.

This loader is confirmed working with Faust v2.30.5, but may break on lower versions.
[Help is wanted](https://github.com/Smona/faust-loader/issues/1) on
getting the WASM version of libfaust working in NodeJS.

## Installation

1. Install the Faust compiler version >=2.30.5. You can [download it](https://faust.grame.fr/downloads/) or
   [build it from source](https://github.com/grame-cncm/faust/wiki/BuildingSimple). It's also available from the AUR.

2. Install faust-loader and standardized-audio-context:

```bash
npm install --save faust-loader standardized-audio-context
# OR
yarn add faust-loader standardized-audio-context
```

3. Add faust-loader to your webpack config:

```ts
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

### With Typescript

Typescript definitions are available for the imported modules. To automatically get the correct types when you
import a `.dsp` file, add a file ending in `.d.ts` to your project containing the following:

```ts
// faust-modules.d.ts

declare module "*.dsp" {
  import { ProcessorLoader } from "faust-loader";
  const loader: ProcessorLoader;
  export = loader;
}
```

You may need to update your `tsconfig.json` to ensure declaration files in your
project are included by the Typescript compiler.

### With Tone.js

```ts
import { getContext, connect } from "tone";
import createSynth from "./Synthesizer.dsp";

async function connectSynth() {
  const context = getContext();

  // `context` is the Tone Context, we need to get the raw standardized-audio-context.
  const node = await createSynth(context.rawContext);

  // We also need to use the global `connect` function since the node isn't a Tone AudioNode.
  connect(node, context.destination);
}
```

### With Next.js

```js
// next.config.js

module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: [/\.dsp$/],
      loader: "faust-loader",
      options: {
        outputPath: `${isServer ? "../" : ""}static/processors/`,
        publicPath: "/_next/static/processors",
      },
    });

    return config;
  },
};
```
