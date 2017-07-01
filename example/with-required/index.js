/**
 * Example of the "__pattern__" property on a simple object composed at root-level properties only.
 */

const fs = require("fs");
const util = require("util");

const jsonStructureSchema = require("../../lib/index");

const rawSchema = fs.readFileSync("schema.json")
const schema = JSON.parse(rawSchema.toString());

const rawValue = fs.readFileSync("value.json")
const value = JSON.parse(rawValue.toString());

const transformed = jsonStructureSchema.transform(value, schema);
console.log(transformed);