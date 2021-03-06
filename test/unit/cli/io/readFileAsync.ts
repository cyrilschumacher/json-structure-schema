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
import * as fs from "fs";
import * as sinon from "sinon";

import { readFileAsync } from "../../../../src/cli/io/readFileAsync";

describe("readFileAsync", () => {
    let readFileStub: sinon.SinonStub;

    beforeEach(() => readFileStub = sinon.stub(fs, "readFile"));
    afterEach(() => readFileStub.restore());

    it("should return data", () => {
        // Given
        const func = (filename: string, encoding: string, callback: (error: any, content: string) => void) =>
            callback(void 0, "test");
        readFileStub.callsFake(func);

        // When
        const content = readFileAsync("foo.json", "utf8");

        // Then
        return chai.expect(content).to.eventually.fulfilled.and.to.be.eql("test");
    });

    it("should throw error", () => {
        // Given
        const func = (filename: string, encoding: string, callback: (error: any, content?: string) => void) =>
            callback("error");
        readFileStub.callsFake(func);

        // When
        const content = readFileAsync("foo.json");

        // Then
        return chai.expect(content).to.eventually.rejected.and.to.be.eql("error");
    });
});
