import * as fs from "fs-extra";
import * as path from "path";
import * as glob from "fast-glob";

import readIgnoreFiles from "./readIgnoreFiles";

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

export default async function handler({ clean, dir, force }: Yargs) {
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
}
