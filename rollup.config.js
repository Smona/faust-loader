import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "index.ts",
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [nodeResolve(), typescript()],
};
