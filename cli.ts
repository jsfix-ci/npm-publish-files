import * as fs from "fs-extra";
import * as path from "path";
import * as glob from "fast-glob";
import * as yargs from "yargs";

// https://docs.npmjs.com/files/package.json#files
const include = [
  "README",
  "CHANGES",
  "CHANGELOG",
  "HISTORY",
  "LICENSE",
  "LICENCE",
  "NOTICE"
];

const defaultIgnore = [
  ".git",
  "CVS",
  ".svn",
  ".hg",
  ".lock-wscript",
  ".wafpickle-N",
  ".*.swp",
  ".DS_Store",
  "._*",
  "npm-debug.log",
  ".npmrc",
  "node_modules",
  "config.gypi",
  "*.orig",
  "package-lock.json"
];

const readIgnoreFiles = async () => {
  const [npmignore, gitignore] = await Promise.all(
    [".npmignore", ".gitignore"].map(
      path =>
        new Promise<Buffer | null>(async resolve => {
          resolve((await fs.pathExists(path)) ? fs.readFile(path) : null);
        })
    )
  );

  if (npmignore || gitignore) {
    // one of the does exist
    return (npmignore || gitignore)!
      .toString()
      .split("\n")
      .filter(Boolean);
  } else {
    return [];
  }
};

type Yargs = { clean: boolean; dir: string; force: boolean };

async function handler({ clean, dir, force }: Yargs) {
  try {
    dir = path.relative(process.cwd(), dir);
    await fs.ensureDir(dir);
    const externalIgnore = await readIgnoreFiles();
    const files: string[] = await glob.async(include, {
      case: false,
      ignore: [...defaultIgnore, ...externalIgnore],
      stats: false
    });

    if (!clean) {
      // Copy files
      const copyOperations = [];
      for (const file of ["package.json", ...files]) {
        copyOperations.push(
          fs.copy(file, `${dir}/${file}`, {
            errorOnExist: true,
            overwrite: force
          })
        );
      }
      await Promise.all(copyOperations);
    } else {
      // Remove files
      const rmOperations = [];
      for (const file of ["package.json", ...files]) {
        rmOperations.push(fs.remove(`${dir}/${file}`));
      }
      await Promise.all(rmOperations);
    }
  } catch (error) {
    console.error(error);
  }
}

yargs
  .command<Yargs>({
    command: "$0 <dir>",
    describe: "Copy npm publish files to <dir>.",
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
