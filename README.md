# json-structure-schema

> Transform a JSON object into a particular format using a specific schema.

[![MIT License][license-image]][license-url]
[![npm version][npmjs-image]][npmjs-url]
[![TypeScript][typescript-image]][typescript-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![typescript-standard-style][standard-image]][standard-url]
[![david-dm dependency Status][david-image]][david-url]
[![david-dm devDependency Status][david-dev-dependencies-image]][david-dev-dependencies-url]

**json-structure-schema** is small library that transform a given JSON object in another which respects a given JSON schema.

This library can be of interest if you retrieve external sources and need to be reformatted. In this case, you can make iterations and conditions to set up a structure that meets your needs. This library responds to this need by providing:

* a simple function that requires a simple JSON object and a schema
* and an executable that also offers the same functionality as the function.

This library was developed with the programming language: [TypeScript](http://www.typescriptlang.org/): typing files are available.

## Getting Started

### Usage

To install to using [npm](https://www.npmjs.com/) package manager or [Yarn](https://yarnpkg.com/):

```bash
$ npm install json-structure-schema
$ yarn add json-structure-schema
```

After installation, You can use the library this way:

```javascript
import { transform } from "json-structure-schema";

const value = { key: "package.name" };
const schema = {
  name: { __pattern__: "key" }
}
const transformed = transform(value, schema); // { name: "package.name" }
```

If you want to have a quick overview of all the features of this library, take a look at the [examples](examples) or [integrations tests](test/integration).

### Command-Line

You have possibility to run in command-line this library without create a small JavaScript file. This executable provides all the options that are available at the code level. To see all the options, run the following line:

```bash
json-structure-schema --help
```

### Reserved property names

Property names are indeed reserved in the case of this library:

* `__pattern__: `

  Defines the path to source key. This **property is mandatory**: if it is not present in the JSON object of the schema, the library considered it a simple object.

```json
{ "__pattern__": "node1.node2.key3"}
```

* `__required__`

Defines if the source key is required or not. This property can be used with `__default__`: if the value does not exist, the default property is used to set an alternative value.

```json
{ "__required__": "true"}
```

* `__default__`

Defines the default value if the source key is missing. In the case of an existing value, this property is ignored.

```json
{ "__default__": "Default value"}
```

* `__converter__`

Defines a converter used to convert the value of the source key to another type or value.

```javascript
{
	__default__: function (value) {
		return "Value: " + value;
	}
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

[david-dev-dependencies-image]: https://david-dm.org/cyrilschumacher/json-structure-schema/dev-status.svg
[david-dev-dependencies-url]: https://david-dm.org/cyrilschumacher/json-structure-schema#info=devDependencies

[david-image]: https://david-dm.org/cyrilschumacher/json-structure-schema.svg
[david-url]: https://david-dm.org/cyrilschumacher/json-structure-schema

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npmjs-image]: https://badge.fury.io/js/json-structure-schema.svg
[npmjs-url]: https://www.npmjs.com/package/json-structure-schema

[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines

[travis-image]: https://travis-ci.org/cyrilschumacher/json-structure-schema.svg
[travis-url]: https://travis-ci.org/cyrilschumacher/json-structure-schema

[typescript-image]: https://badges.frapsoft.com/typescript/code/typescript.svg?v=101
[typescript-url]: https://github.com/ellerbrock/typescript-badges/

[coveralls-image]: https://coveralls.io/repos/github/cyrilschumacher/json-structure-schema/badge.svg?branch=develop
[coveralls-url]: https://coveralls.io/github/cyrilschumacher/json-structure-schema?branch=develop