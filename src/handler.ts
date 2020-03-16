import fs from "fs-extra";
import minimatch from "minimatch";
import packlist from "npm-packlist";
import path from "path";

export const handler = async ({ clean, dir, force }: Yargs) => {
  const CWD = process.cwd();
  const dist = path.resolve(CWD, dir);
  await fs.ensureDir(dist);

  // Get default set of files
  const packFiles = await packlist({ path: CWD });

  // Filter out dist dir itself
  const filter = `!{${dir},${dir}/**}`;
  const files = packFiles.filter(minimatch.filter(filter));

  const returnFileList = () => files;

  if (clean) {
    // --clean flag was used, remove files instead of copying
    return Promise.all(
      files.map((file: string) => fs.remove(path.resolve(dist, file)))
    ).then(returnFileList);
  }

  return Promise.all(
    files.map((file: string) =>
      fs.copy(file, path.resolve(dist, file), {
        errorOnExist: true,
        overwrite: force
      })
    )
  ).then(returnFileList);
};
