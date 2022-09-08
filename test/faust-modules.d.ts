declare module "*.dsp" {
  const loader: import("../src/faustLoader").ProcessorLoader;
  export = loader;
}
