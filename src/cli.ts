import yargs from "yargs";

import { Args, handler } from "./handler";

yargs.command<Args>({
  command: "$0 <dir>",
  describe: "copy special files `npm publish` always includes to <dir>",
  builder: {
    force: {
      alias: "f",
      default: false,
      describe: "overwrite existing files",
      type: "boolean"
    },
    clean: {
      alias: "c",
      default: false,
      describe: "remove files instead of copying",
      type: "boolean"
    },
    include: {
      alias: "i",
      default: [],
      describe: "glob for additional files",
      type: "array"
    },
    exclude: {
      alias: "x",
      default: [],
      describe: "glob to prevent copying files",
      type: "array"
    }
  },
  handler
}).argv;
