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
import { convertJsonToArray } from "../../../src/transform/convertJsonToArray";

describe("convertJsonToArray", () => {
    it("should convert basic JSON object with simple array", () => {
        // Given
        const jsonObject = {
            key1: "value1",
            key2: 123,
            key3: false,
        };

        // When
        const keys = convertJsonToArray(jsonObject);

        // Then
        chai.expect(keys).to.be.an("Array").and.to.be.not.empty;

        chai.expect(keys).to.have.property("key1", "value1");
        chai.expect(keys).to.have.property("key2", 123);
        chai.expect(keys).to.have.property("key3", false);
    });

    it("should convert complex JSON object with simple array", () => {
        // Given
        const jsonObject = {
            key1: "value1",
            key2: {
                key3: 123,
                key4: {
                    key5: false,
                },
            },
        };

        // When
        const keys = convertJsonToArray(jsonObject);

        // Then
        chai.expect(keys).to.be.an("Array").and.to.be.not.empty;

        chai.expect(keys).to.have.property("key1", "value1");
        chai.expect(keys).to.have.property("key2.key3", 123);
        chai.expect(keys).to.have.property("key2.key4.key5", false);
    });
});