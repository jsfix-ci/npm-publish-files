import readIgnoreFiles from "../src/readIgnoreFiles";

test("readIgnoreFiles", async () => {
  const ignoreFile = await readIgnoreFiles();
  expect(ignoreFile).toMatchSnapshot();
});
