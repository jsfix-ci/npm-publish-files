import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";

import pkg from "./package.json";

export default {
  input: "src/cli.ts",
  output: {
    file: pkg.bin,
    format: "cjs",
    banner: "#!/usr/bin/env node"
  },
  external: ["fs", "path", ...Object.keys(pkg.dependencies)],
  plugins: [
    typescript({ typescript: require("typescript") }),
    json()
  ]
};
