# faust-loader

Import [Faust](https://faust.grame.fr/) .dsp files, and get back an AudioWorklet or ScriptProcessor node.

**Note: this library is still in development, and is not ready for production usage yet**

## Installation

1. Install the Faust compiler (has to be v2 or greater):

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
