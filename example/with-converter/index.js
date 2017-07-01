/**
 * Example of the "__converter__" property:
 * 
 * 	- use "parseInt" to convert a string to a numeric value;
 *  - use custom function to format string;
 */

const fs = require("fs");
const util = require("util");

const jsonStructureSchema = require("../../lib/index");

const schema = {
	key1: {
		__pattern__: "_key1",
		__converter__: parseInt
	},
	key2: {
		__pattern__: "_key2",
		__converter__: function (value) {
			return util.format(value, "world");
		}
	}
};

const rawValue = fs.readFileSync("value.json")
const value = JSON.parse(rawValue.toString());

const transformed = jsonStructureSchema.transform(value, schema);
console.log(transformed);