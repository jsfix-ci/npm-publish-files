import * as fs from "fs-extra";
import * as path from "path";

import handler from "../src/handler";

const TMP_DIR = path.relative(process.cwd(), "test/tmp");

test("handler", async () => {
  // Remove temp files
  await fs.remove(TMP_DIR);

  // Create temp files
  await handler({
    clean: false,
    dir: TMP_DIR,
    force: false
  });

  expect(await fs.pathExists(TMP_DIR + "/LICENSE")).toBeTruthy();
  expect(await fs.pathExists(TMP_DIR + "/CHANGELOG.md")).toBeTruthy();
  expect(await fs.pathExists(TMP_DIR + "/README.md")).toBeTruthy();
  expect(await fs.pathExists(TMP_DIR + "/package.json")).toBeTruthy();
  expect(await fs.pathExists(TMP_DIR + "/package-lock.json")).toBeFalsy();

  // Should fail to overwrite temp files without -f
  await expect(
    handler({
      clean: false,
      dir: TMP_DIR,
      force: false
    })
  ).rejects.toBeTruthy();

  // Succesfully overwrites temp files with -f
  await expect(
    handler({
      clean: false,
      dir: TMP_DIR,
      force: true
    })
  ).resolves.toBeTruthy();

  // Removes temp files with -c
  await handler({
    clean: true,
    dir: TMP_DIR,
    force: false
  });

  expect(await fs.pathExists(TMP_DIR + "/LICENSE")).toBeFalsy();
  expect(await fs.pathExists(TMP_DIR + "/CHANGELOG.md")).toBeFalsy();
  expect(await fs.pathExists(TMP_DIR + "/README.md")).toBeFalsy();
  expect(await fs.pathExists(TMP_DIR + "/package.json")).toBeFalsy();
});
