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

import * as chai from "chai";
import * as sinon from "sinon";

import * as assertArgument from "../../../src/cli/assertArgument";
import * as format from "../../../src/cli/format";
import * as readJsonFileContentAsync from "../../../src/cli/io/readJsonFileContentAsync";
import * as writeOutFileAsync from "../../../src/cli/io/writeOutFileAsync";

import { executeAsync } from "../../../src/cli/executeAsync";

describe("executeAsync", () => {
    let assertArgumentStub: sinon.SinonStub;
    let consoleLogStub: sinon.SinonStub;
    // let readJsonFileContentAsyncStub: sinon.SinonStub;
    // let writeOutFileAsyncStub: sinon.SinonStub;

    beforeEach(() => {
        assertArgumentStub = sinon.stub(assertArgument, "assertArgument");
        consoleLogStub = sinon.stub(console, "log");
        // readJsonFileContentAsyncStub = sinon.stub(readJsonFileContentAsync, "readJsonFileContentAsync");
        // writeOutFileAsyncStub = sinon.stub(writeOutFileAsync, "writeOutFileAsync");
    });
    afterEach(() => {
        consoleLogStub.restore();
        assertArgumentStub.restore();
        // readJsonFileContentAsyncStub.restore();
        // writeOutFileAsyncStub.restore();
    });

    it("should throw exception with 'null' value", async () => {
        // Given
        assertArgumentStub.throws(TypeError);

        // When
        await executeAsync.call(void 0, void 0, "schema", {});
        consoleLogStub.restore();

        // Then
        console.log(consoleLogStub);
        chai.expect(consoleLogStub.args[0]).to.be.true;
    });
});
