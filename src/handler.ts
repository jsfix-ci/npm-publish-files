import glob from "fast-glob";
import fs from "fs-extra";
import path from "path";

const PACKAGE_JSON = "package.json";

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
  const CWD = process.cwd();
  const dist = path.resolve(CWD, dir);
  await fs.ensureDir(dist);

  const globOptions = {
    caseSensitiveMatch: false,
    cwd: CWD,
    ignore: [dist], // always ignore dist itself
    onlyFiles: true,
    stats: false
  };

  const defaultFiles: string[] = await glob(include, globOptions);
  const { files } = require(path.resolve(CWD, PACKAGE_JSON));
  const hasOptionalFiles = files && Array.isArray(files) && files.length;
  const optionalFiles = hasOptionalFiles ? await glob(files, globOptions) : [];

  const publishFiles = [PACKAGE_JSON, ...defaultFiles, ...optionalFiles];

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
