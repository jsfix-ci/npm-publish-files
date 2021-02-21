import { constants, promises as fs } from "fs";
import globby from "globby";
import minimatch from "minimatch";
import packlist from "npm-packlist";
import path from "path";

const ensureDir = async (dir: string): Promise<void> => {
  try {
    const stats = await fs.stat(dir);
    if (!stats.isDirectory()) {
      throw new Error(`${dir} exists but is not a directory!`);
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(dir, { recursive: true });
    } else {
      throw err;
    }
  }
};

type Handler = {
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
  include = [],
}: Handler): Promise<string[]> => {
  const CWD = process.cwd();
  const dist = path.resolve(CWD, dir);
  await ensureDir(dist);

  // Get default set of files
  const packFiles = await packlist({ path: CWD });

  const includedFiles: string[] = [];

  // Add .npmignore if it exists
  try {
    const npmIgnoreFile = path.resolve(__dirname, ".npmignore");
    await fs.stat(npmIgnoreFile);
    includedFiles.push(".npmignore");
  } catch {}

  await Promise.all(
    include.map((pattern) =>
      globby(pattern, { cwd: CWD, expandDirectories: true }).then((matches) =>
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
  const files = ["node_modules", ...exclude].reduce(
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
        files.map((file: string) => fs.unlink(path.resolve(dist, file)))
      : // Copy all files. Throw when file exists unless `force` is used.
        files.map(async (file: string) => {
          const to = path.resolve(dist, file);
          const dirname = path.dirname(to);
          await ensureDir(dirname);
          await fs.copyFile(
            path.resolve(CWD, file),
            to,
            force ? undefined : constants.COPYFILE_EXCL
          );
        })
  );

  // Return list of files when done
  return files;
};
