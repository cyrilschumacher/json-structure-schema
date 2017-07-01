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
import { adaptValueFromSchema } from "../../../src/transform/adaptValueFromSchema";

describe("adaptValueFromSchema", () => {
    it("should return value", () => {
        // Given
        const value = { _key: "value" };
        const schemaValue = { __pattern__: "_key" };

        // When
        const adaptedValue = adaptValueFromSchema(value, schemaValue);

        // Then
        chai.expect(adaptedValue).to.be.an("string").and.to.be.equal("value");
    });

    it("should return default value", () => {
        // Given
        const value = { };
        const schemaValue = { __pattern__: "_non-existent", __default__: "default" };

        // When
        const adaptedValue = adaptValueFromSchema(value, schemaValue);

        // Then
        chai.expect(adaptedValue).to.be.an("string").and.to.be.equal("default");
    });

    it("should return default and required value", () => {
        // Given
        const value = { };
        const schemaValue = { __pattern__: "_non-existent", __default__: "default", __required__: true };

        // When
        const adaptedValue = adaptValueFromSchema(value, schemaValue);

        // Then
        chai.expect(adaptedValue).to.be.an("string").and.to.be.equal("default");
    });

    it("should return converted value", () => {
        // Given
        const value = { _key: "123" };
        const schemaValue = { __pattern__: "_key", __converter__: parseInt };

        // When
        const adaptedValue = adaptValueFromSchema(value, schemaValue);

        // Then
        chai.expect(adaptedValue).to.be.an("number").and.to.be.equal(123);
    });

    it("should throw exception", () => {
        // Given
        const value = { _key: "value" };
        const schemaValue = { __pattern__: "_non-existent", __required__: true };

        // When
        const fn = () => adaptValueFromSchema(value, schemaValue);

        // Then
        chai.expect(fn).to.throw(Error, "A required property: \'_non-existent\' is missing.");
    });
});
