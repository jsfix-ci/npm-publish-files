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

  const promises = clean
    ? // Delete all matched files when `clean` is used
      files.map((file: string) => fs.remove(path.resolve(dist, file)))
    : // Copy all files. Throw when file exists unless `force` is used.
      files.map((file: string) =>
        fs.copy(file, path.resolve(dist, file), {
          errorOnExist: true,
          overwrite: force
        })
      );

  await Promise.all(promises);

  // Return list of files when done
  return files;
};
