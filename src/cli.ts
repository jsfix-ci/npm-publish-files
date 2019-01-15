import * as yargs from "yargs";

import handler from "./handler";

yargs
  .command<Yargs>({
    command: "$0 <dir>",
    describe: "Copy special files `npm publish` always includes to <dir>",
    handler
  })
  .option("f", {
    alias: "force",
    default: false,
    describe: "Overwrite existing files",
    type: "boolean"
  })
  .option("c", {
    alias: "clean",
    default: false,
    describe: "Remove files instead of copying",
    type: "boolean"
  })
  .alias("h", "help")
  .alias("v", "version").argv;
