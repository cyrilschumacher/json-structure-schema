/* The MIT License (MIT)
 *
 * Copyright (c) 2017 Cyril Schumacher.fr
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import * as chalk from "chalk";

import { assertArgument } from "./cli/assertArgument";
import { format } from "./cli/format";
import { readJsonFileContentAsync } from "./cli/io/readJsonFileContentAsync";
import { writeOutFileAsync } from "./cli/io/writeOutFileAsync";
import { transform } from "./index";

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
