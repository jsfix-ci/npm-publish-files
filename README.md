# npm-publish-files

[![GitHub Actions](https://github.com/iiroj/npm-publish-files/workflows/Tags/badge.svg)](https://github.com/iiroj/npm-publish-files/actions)
[![version](https://img.shields.io/npm/v/npm-publish-files.svg)](https://www.npmjs.com/package/npm-publish-files)
[![code size](https://img.shields.io/github/languages/code-size/iiroj/npm-publish-files.svg)](https://github.com/iiroj/npm-publish-files)
[![dependencies](https://img.shields.io/david/iiroj/npm-publish-files.svg)](https://github.com/iiroj/npm-publish-files/blob/master/package.json)
[![devDependencies](https://img.shields.io/david/dev/iiroj/npm-publish-files.svg)](https://github.com/iiroj/npm-publish-files/blob/master/package.json)

```sh
❯ npx npm-publish-files --help
Usage: npm-publish-files [options] <dir>

Copy special files `npm publish` always includes to a sub directory

Options:
  -V, --version         output the version number
  -f, --force           overwrite existing files (default: false)
  -c, --clean           remove files instead of copying (default: false)
  -i, --include <glob>  glob for additional files (default: [])
  -x, --exclude <glob>  glob to prevent copying files (default: [])
  -h, --help            display help for command
```

If you want to build a large npm project into a sub folder `dist/`, but then treat that as the root directory for the published package, you will need to copy all other special files npm includes in the publish. Let `npm-publish-files` do that for you!

### Setup

This script will make sure all necessary files are copied to `dist/` before running `npm publish`:

```json
{
  "scripts": {
    "prepublishOnly": "npm-publish-files --force dist"
  }
}
```

Any additional files specified in the ["file" property of package.json](https://docs.npmjs.com/files/package.json#files) will also be copied.

After this your are free to run `npm publish dist`.

## Files Copied

`npm-publish-files` uses the [npm-packlist](https://github.com/npm/npm-packlist) package under the hood to determine which files to copy. Please read its readme to better understand the algorhithm.

To copy additional files, supply one or more globs with the `--include` option. All matched files will be copied to `<dir>`.

To exclude files from being copied, supply one or more globs with the `--exclude` option. These will be applied last, so they filter both the default files, as well as those matched via the `--include` option.
