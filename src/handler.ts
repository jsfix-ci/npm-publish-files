import fs from "fs";
import cbGlob, { IOptions as GlobOptions } from "glob";
import minimatch from "minimatch";
import packlist from "npm-packlist";
import path from "path";

const ensureDir = async (dir: string) => {
  try {
    const stats = await fs.promises.stat(dir);
    if (!stats.isDirectory()) {
      throw new Error(`${dir} exists but is not a directory!`);
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.promises.mkdir(dir);
    } else {
      throw err;
    }
  }
};

const glob = (pattern: string, options: GlobOptions) =>
  new Promise<string[]>((resolve, reject) =>
    cbGlob(pattern, options, (err, matches) => {
      if (err) return reject(err);
      return resolve(matches);
    })
  );

export type Args = {
  clean: boolean;
  dir: string;
  force: boolean;
  include: string[];
  exclude: string[];
};

export const handler = async ({
  clean = false,
  dir,
  exclude = [],
  force = false,
  include = []
}: Args) => {
  const CWD = process.cwd();
  const dist = path.resolve(CWD, dir);
  await ensureDir(dist);

  // Get default set of files
  const packFiles = await packlist({ path: CWD });

  // Get manually specified files
  const includedFiles: string[] = [];
  await Promise.all(
    include.map(pattern =>
      glob(pattern, { cwd: CWD }).then(matches =>
        includedFiles.push(...matches)
      )
    )
  );

  // Filter out dist dir itself
  const recursiveFilter = minimatch.filter(`!{${dir},${dir}/**}`);
  // Create new unique array from all matches and filter out dist dir
  const allFiles = Array.from(new Set(packFiles.concat(includedFiles))).filter(
    recursiveFilter
  );

  // Get final list of files after running all exclude filters
  const files = exclude.reduce(
    (files, excudeGlob) =>
      files.filter(
        (value, index, array) =>
          !minimatch.filter(excudeGlob)(value, index, array)
      ),
    allFiles
  );

  await Promise.all(
    clean
      ? // Delete all matched files when `clean` is used
        files.map((file: string) =>
          fs.promises.unlink(path.resolve(dist, file))
        )
      : // Copy all files. Throw when file exists unless `force` is used.
        files.map((file: string) =>
          fs.promises.copyFile(
            path.resolve(CWD, file),
            path.resolve(dist, file),
            force ? undefined : fs.constants.COPYFILE_EXCL
          )
        )
  );

  // Return list of files when done
  return files;
};
