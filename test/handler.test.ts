import * as fs from "fs-extra";
import * as path from "path";

import { handler } from "../src/handler";

const TMP_DIR = path.relative(process.cwd(), "test/tmp");

test("handler default", async () => {
  // Remove temp files
  await fs.remove(TMP_DIR);

  // Create temp files
  await handler({
    clean: false,
    dir: TMP_DIR,
    exclude: [],
    force: false,
    include: []
  });

  expect(await fs.pathExists(TMP_DIR + "/LICENSE")).toBeTruthy();
  expect(await fs.pathExists(TMP_DIR + "/CHANGELOG.md")).toBeTruthy();
  expect(await fs.pathExists(TMP_DIR + "/README.md")).toBeTruthy();
  expect(await fs.pathExists(TMP_DIR + "/package.json")).toBeTruthy();
  expect(await fs.pathExists(TMP_DIR + "/package-lock.json")).toBeFalsy();
  expect(await fs.pathExists(TMP_DIR + "/tmp")).toBeFalsy();

  // Should fail to overwrite temp files without -f
  await expect(
    handler({
      clean: false,
      dir: TMP_DIR,
      exclude: [],
      force: false,
      include: []
    })
  ).rejects.toBeTruthy();

  // Succesfully overwrites temp files with -f
  await expect(
    handler({
      clean: false,
      dir: TMP_DIR,
      exclude: [],
      force: true,
      include: []
    })
  ).resolves.toBeTruthy();

  // Removes temp files with -c
  await handler({
    clean: true,
    dir: TMP_DIR,
    exclude: [],
    force: false,
    include: []
  });

  expect(await fs.pathExists(TMP_DIR + "/.npmignore")).toBeFalsy();
  expect(await fs.pathExists(TMP_DIR + "/LICENSE")).toBeFalsy();
  expect(await fs.pathExists(TMP_DIR + "/CHANGELOG.md")).toBeFalsy();
  expect(await fs.pathExists(TMP_DIR + "/README.md")).toBeFalsy();
  expect(await fs.pathExists(TMP_DIR + "/package.json")).toBeFalsy();
});

test("handler include", async () => {
  // Remove temp files
  await fs.remove(TMP_DIR);
  // Create temp files
  await handler({
    clean: false,
    dir: TMP_DIR,
    exclude: [],
    force: false,
    include: ["jest.config.js", "*.json"]
  });

  expect(await fs.pathExists(TMP_DIR + "/jest.config.js")).toBeTruthy();
  expect(await fs.pathExists(TMP_DIR + "/tsconfig.json")).toBeTruthy();
  expect(await fs.pathExists(TMP_DIR + "/tslint.json")).toBeTruthy();
});

test("handler exclude", async () => {
  // Remove temp files
  await fs.remove(TMP_DIR);
  // Create temp files
  await handler({
    clean: false,
    dir: TMP_DIR,
    exclude: ["LICENSE", "*.md"],
    force: false,
    include: []
  });

  expect(await fs.pathExists(TMP_DIR + "/LICENSE")).toBeFalsy();
  expect(await fs.pathExists(TMP_DIR + "/CHANGELOG.md")).toBeFalsy();
  expect(await fs.pathExists(TMP_DIR + "/README.md")).toBeFalsy();
});
