import glob from "fast-glob";
import fs from "fs-extra";
import path from "path";

// https://docs.npmjs.com/files/package.json#files
const include = [
  "README*",
  "CHANGES*",
  "CHANGELOG*",
  "HISTORY*",
  "LICENSE*",
  "LICENCE*",
  "NOTICE*"
];

export default async function handler({ clean, dir, force }: Yargs) {
  const dist = path.resolve(process.cwd(), dir);
  await fs.ensureDir(dist);

  const defaultFiles: string[] = await glob(include, {
    caseSensitiveMatch: false,
    onlyFiles: true,
    stats: false
  });

  const publishFiles = ["package.json", ...defaultFiles];

  const returnFileList = () => publishFiles;

  if (clean) {
    // --clean flag was used, remove files instead of copying
    return Promise.all(
      publishFiles.map(file => fs.remove(path.resolve(dist, file)))
    ).then(returnFileList);
  }

  return Promise.all(
    publishFiles.map(file =>
      fs.copy(file, path.resolve(dist, file), {
        errorOnExist: true,
        overwrite: force
      })
    )
  ).then(returnFileList);
}
