<div align="center">
  <h1 align="center">npm-publish-files</h1>
  <br/>
  <p>Copy special files <code>npm publish</code> always includes to a sub directory</p>
  <a href="https://www.npmjs.com/package/npm-publish-files"><strong>npm</strong></a> ·
  <a href="https://github.com/iiroj/npm-publish-files"><strong>GitHub</strong></a>
  <br/>
  <br/>
  <a href="https://www.npmjs.com/package/npm-publish-files">
    <img src="https://img.shields.io/npm/v/npm-publish-files.svg">
  </a>
  <a href="https://travis-ci.com/iiroj/npm-publish-files">
    <img src="https://travis-ci.com/iiroj/npm-publish-files.svg?branch=master" />
  </a>
  <a href="https://github.com/iiroj/npm-publish-files">
    <img src="https://img.shields.io/github/languages/code-size/iiroj/npm-publish-files.svg">
  </a>
  <a href="https://github.com/iiroj/npm-publish-files/blob/master/package.json">
    <img src="https://img.shields.io/david/iiroj/npm-publish-files.svg">
  </a>
  <a href="https://github.com/iiroj/npm-publish-files/blob/master/package.json">
    <img src="https://img.shields.io/david/dev/iiroj/npm-publish-files.svg">
  </a>
  <br/>
  <br/>
</div>

If you want to build a large npm project into a sub folder `dist/`, but then treat that as the root directory for the published package, you will need to copy all other special files npm includes in the publish. Let `npm-publish-files` do that for you!

### Install

```bash
npm install --save-dev npm-publish-files
```

### Setup

This script will make sure all necessary files are copied to `dist/` before running `npm publish`:

```json
{
  "scripts": {
    "prepublishOnly": "npm-publish-files --force dist"
  }
}
```

After this your are free to run `npm publish dist`.

### Options

`npm-publish-files` supports a few options:

* `--force` — Copy files and overwrite existing ones [default: false]
* `--clean` — Remove files instead of copying them [default: false]

## Files Copied

`npm-publish-files` chooses the files to copy according to the [npm docs](https://docs.npmjs.com/files/package.json#files).
