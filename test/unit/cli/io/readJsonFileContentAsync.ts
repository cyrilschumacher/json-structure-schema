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
import * as readFileAsync from "../../../../src/cli/io/readFileAsync";

import { readJsonFileContentAsync } from "../../../../src/cli/io/readJsonFileContentAsync";

import chaiAsPromised = require("chai-as-promised");

describe("readJsonFileContentAsync", () => {
    chai.use(chaiAsPromised);

    let readFileStub: sinon.SinonStub;

    beforeEach(() => readFileStub = sinon.stub(readFileAsync, "readFileAsync"));
    afterEach(() => readFileStub.restore());

    it("should return JSON object", () => {
        // Given
        readFileStub.withArgs("foo.json").resolves("{\"key\": \"value\"}");

        // When
        const read = readJsonFileContentAsync("foo.json");

        // Then
        return chai.expect(read).to.eventually.fulfilled.and.to.be.eql({ key: "value" });
    });

    it("should return JSON object with custom encoding", () => {
        // Given
        readFileStub.withArgs("foo.json", "ascii").resolves("{\"key\": \"value\"}");

        // When
        const read = readJsonFileContentAsync("foo.json", "ascii");

        // Then
        return chai.expect(read).to.eventually.fulfilled.and.to.be.eql({ key: "value" });
    });

    it("should throw exception with missing file", () => {
        // Given
        readFileStub.withArgs("non-existent.json").rejects(void 0);

        // When
        const read = readJsonFileContentAsync("non-existent.json");

        // Then
        return chai.expect(read).to.eventually.rejectedWith("File: 'non-existent.json' cannot be opened.");
    });

    it("should throw exception with bad content", () => {
        // Given
        readFileStub.withArgs("foo.json").resolves("test");

        // When
        const read = readJsonFileContentAsync("foo.json");

        // Then
        return chai.expect(read).to.eventually.rejectedWith("File: 'foo.json' cannot be opened.");
    });
});
