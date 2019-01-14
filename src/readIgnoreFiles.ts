import * as fs from "fs-extra";

export default async () => {
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
