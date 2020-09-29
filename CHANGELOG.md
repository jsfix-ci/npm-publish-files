# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.2.4](https://github.com/iiroj/npm-publish-files/compare/v1.2.3...v1.2.4) (2020-09-29)


### Bug Fixes

* always copy .npmignore file just in case ([e6106dc](https://github.com/iiroj/npm-publish-files/commit/e6106dcdd3bc91623124ab2fb5a415fe2fbde9c0))
* do not lint all files during commit ([a4db139](https://github.com/iiroj/npm-publish-files/commit/a4db13968e051591882d664eabbc666214938ae6))

### [1.2.3](https://github.com/iiroj/npm-publish-files/compare/v1.2.2...v1.2.3) (2020-06-17)


### Bug Fixes

* ensure node_modules is always ignored ([fc2a8c7](https://github.com/iiroj/npm-publish-files/commit/fc2a8c746193b43a377c7fe2542ecb63378fedb7))

### [1.2.2](https://github.com/iiroj/npm-publish-files/compare/v1.2.1...v1.2.2) (2020-03-25)


### Bug Fixes

* ensure directories are created when copying files ([4eb0656](https://github.com/iiroj/npm-publish-files/commit/4eb0656d6ff3e8156bba161c96ced56a329d6dde))

### [1.2.1](https://github.com/iiroj/npm-publish-files/compare/v1.2.0...v1.2.1) (2020-03-17)


### Bug Fixes

* update readme ([86e1d5f](https://github.com/iiroj/npm-publish-files/commit/86e1d5fd78878668014996ecb5340dfda6769e2d))

## [1.2.0](https://github.com/iiroj/npm-publish-files/compare/v1.1.2...v1.2.0) (2020-03-17)


### Features

* add --include and --exclude globs ([69af86a](https://github.com/iiroj/npm-publish-files/commit/69af86a1ca7e27f6fa43e0aac21a0affd5f09483))
* use npm-packlist for most of the globbing ([2556fb4](https://github.com/iiroj/npm-publish-files/commit/2556fb495082534fad85e466133ec7eb87916de0))


### Bug Fixes

* move @types/minimatch as devDependency ([a55b50a](https://github.com/iiroj/npm-publish-files/commit/a55b50a4d8002e825e8facec63205b4b4d11c1f3))

### [1.1.2](https://github.com/iiroj/npm-publish-files/compare/v1.1.1...v1.1.2) (2020-03-14)

### [1.1.1](https://github.com/iiroj/npm-publish-files/compare/v1.1.0...v1.1.1) (2020-03-06)


### Bug Fixes

* properly ignore dist dir for recursivity ([a09adf3](https://github.com/iiroj/npm-publish-files/commit/a09adf3fcab5cf739d71fcf5ee99c86b3742daa9))

## [1.1.0](https://github.com/iiroj/npm-publish-files/compare/v1.0.21...v1.1.0) (2020-03-03)


### Features

* also copy .npmrc, .npmignore and .gitignore ([69cb66e](https://github.com/iiroj/npm-publish-files/commit/69cb66ea51c3f987c6306c06dbd57a8cddd53d2e))
* also copy files matched in the "files" property of package.json ([35e79b8](https://github.com/iiroj/npm-publish-files/commit/35e79b8ccc4cd86244e8f5bff9ef2d31e1ac7f10))
* **handler:** promises return list of affected files ([3736c5b](https://github.com/iiroj/npm-publish-files/commit/3736c5b4ae8f3a5cd7bafebcb96e5bbf6a2cb216))

### [1.0.21](https://github.com/iiroj/npm-publish-files/compare/v1.0.20...v1.0.21) (2019-12-30)

### [1.0.20](https://github.com/iiroj/npm-publish-files/compare/v1.0.19...v1.0.20) (2019-12-01)

### [1.0.19](https://github.com/iiroj/npm-publish-files/compare/v1.0.18...v1.0.19) (2019-09-25)

### [1.0.18](https://github.com/iiroj/npm-publish-files/compare/v1.0.17...v1.0.18) (2019-09-22)


### Bug Fixes

* issues with tslib ([e4c7187](https://github.com/iiroj/npm-publish-files/commit/e4c7187))

### [1.0.17](https://github.com/iiroj/npm-publish-files/compare/v1.0.16...v1.0.17) (2019-08-27)

### [1.0.16](https://github.com/iiroj/npm-publish-files/compare/v1.0.15...v1.0.16) (2019-07-29)



### [1.0.15](https://github.com/iiroj/npm-publish-files/compare/v1.0.14...v1.0.15) (2019-07-11)



### [1.0.14](https://github.com/iiroj/npm-publish-files/compare/v1.0.13...v1.0.14) (2019-07-07)


### Build System

* add husky, commitlint and lint-staged ([890e127](https://github.com/iiroj/npm-publish-files/commit/890e127))



### [1.0.13](https://github.com/iiroj/npm-publish-files/compare/v1.0.12...v1.0.13) (2019-07-06)



### [1.0.12](https://github.com/iiroj/npm-publish-files/compare/v1.0.11...v1.0.12) (2019-06-02)


### Bug Fixes

* downgrade fs-extra because of issues with Jest ([b2418e5](https://github.com/iiroj/npm-publish-files/commit/b2418e5))


### Tests

* run in node environment ([64c0edb](https://github.com/iiroj/npm-publish-files/commit/64c0edb))



## [1.0.11](https://github.com/iiroj/npm-publish-files/compare/v1.0.10...v1.0.11) (2019-04-28)



## [1.0.10](https://github.com/iiroj/npm-publish-files/compare/v1.0.9...v1.0.10) (2019-03-27)



## [1.0.9](https://github.com/iiroj/npm-publish-files/compare/v1.0.8...v1.0.9) (2019-03-17)



## [1.0.8](https://github.com/iiroj/npm-publish-files/compare/v1.0.7...v1.0.8) (2019-03-02)



## [1.0.7](https://github.com/iiroj/npm-publish-files/compare/v1.0.6...v1.0.7) (2019-03-02)



<a name="1.0.6"></a>
## [1.0.6](https://github.com/iiroj/npm-publish-files/compare/v1.0.5...v1.0.6) (2019-02-05)



<a name="1.0.5"></a>
## [1.0.5](https://github.com/iiroj/npm-publish-files/compare/v1.0.4...v1.0.5) (2019-01-26)



<a name="1.0.4"></a>
## [1.0.4](https://github.com/iiroj/npm-publish-files/compare/v1.0.3...v1.0.4) (2019-01-26)



<a name="1.0.3"></a>
## [1.0.3](https://github.com/iiroj/npm-publish-files/compare/v1.0.2...v1.0.3) (2019-01-15)



<a name="1.0.2"></a>
## [1.0.2](https://github.com/iiroj/npm-publish-files/compare/v1.0.1...v1.0.2) (2019-01-15)


### Bug Fixes

* do not read ignore files, because npm includes some files anyway ([e29010a](https://github.com/iiroj/npm-publish-files/commit/e29010a))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/iiroj/npm-publish-files/compare/v1.0.0...v1.0.1) (2019-01-15)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/iiroj/npm-publish-files/compare/v0.2.1...v1.0.0) (2019-01-14)


### Bug Fixes

* add test command ([8cf0d2f](https://github.com/iiroj/npm-publish-files/commit/8cf0d2f))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/iiroj/npm-publish-files/compare/v0.2.0...v0.2.1) (2019-01-14)



<a name="0.2.0"></a>
# [0.2.0](https://github.com/iiroj/npm-publish-files/compare/v0.1.0...v0.2.0) (2019-01-14)


### Features

* inherit .gitignore and .npmignore ([23ebe48](https://github.com/iiroj/npm-publish-files/commit/23ebe48))



<a name="0.1.0"></a>
# 0.1.0 (2019-01-14)


### Features

* initial commit ([375a573](https://github.com/iiroj/npm-publish-files/commit/375a573))
