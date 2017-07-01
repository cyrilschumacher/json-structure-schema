import * as chalk from "chalk";

import { transform } from "../index";
import { assertArgument } from "./assertArgument";
import { format } from "./format";
import { readJsonFileContentAsync } from "./io/readJsonFileContentAsync";
import { writeOutFileAsync } from "./io/writeOutFileAsync";

import ora = require("ora");

export async function executeAsync(fileToConvertPath: string, schemaPath: string, options: ICliOptions) {
    const spinner = ora({});

    try {
        assertArgument("file", fileToConvertPath);
        assertArgument("schema", schemaPath);

        spinner.text = "Loading JSON file and schema file";
        const fileToConvert = await readJsonFileContentAsync(fileToConvertPath, options.encoding);
        const schema = await readJsonFileContentAsync(schemaPath, options.encoding);
        spinner.succeed();

        spinner.text = "Applying schema on JSON content";
        const newValue = transform(fileToConvert, schema);
        spinner.succeed();

        const data = format(newValue, options.pretty, options.prettySpace);
        if (options.out) {
            spinner.text = "Writing JSON content";
            await writeOutFileAsync(options.out, data, options.encoding);
            spinner.succeed();
        } else {
            console.log(data);
        }
    } catch (e) {
        spinner.fail();
        console.log(chalk.white.bgRed(e.message));
    }
}
