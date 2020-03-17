import { program } from "commander";

import { description, name, version } from "../package.json";

import { handler } from "./handler";

const collect = (value: string, previous: string[]) => previous.concat(value);

program
  .name(name)
  .version(version)
  .description(description)
  .arguments("<dir>")
  .option("-f, --force", "overwrite existing files", false)
  .option("-c, --clean", "remove files instead of copying", false)
  .option<string[]>(
    "-i, --include <glob>",
    "glob for additional files",
    collect,
    []
  )
  .option<string[]>(
    "-x, --exclude <glob>",
    "glob to prevent copying files",
    collect,
    []
  )
  .action(async (dir: string, { clean, exclude, force, include }) => {
    await handler({ clean, dir, exclude, force, include });
  });

(async () => {
  try {
    await program.parseAsync(process.argv);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
