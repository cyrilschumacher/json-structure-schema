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
import { transform } from "../../src/index";

describe("index", () => {
    it("should transform simple JSON object with simple schema", () => {
        // Given
        const value = {
            _key1: "value1",
            _key2: 123,
            _key3: true,
            _key4: ["a", 2, false],
        };

        const schema = {
            key1: {
                __pattern__: "_key1",
            },
            key2: {
                __pattern__: "_key2",
            },
            key3: {
                __pattern__: "_key3",
            },
            key4: {
                __pattern__: "_key4",
            },
        };

        // When
        const result = transform(value, schema);

        // Then
        chai.expect(result).to.be.an("object");
        chai.expect(result).to.have.property("key1", "value1");
        chai.expect(result).to.have.property("key2", 123);
        chai.expect(result).to.have.property("key3", true);
        chai.expect(result).to.have.property("key4").and.be.deep.equals(["a", 2, false]);
    });

    it("should transform complex JSON object with simple schema", () => {
        // Given
        const value = {
            _key1: "value1",
            _key2: {
                _key3: 123,
                _key4: {
                    _key5: false,
                },
            },
        };

        const schema = {
            key1: {
                __pattern__: "_key1",
            },
            key2: {
                __pattern__: "_key2._key3",
            },
            key3: {
                __pattern__: "_key2._key4._key5",
            },
        };

        // When
        const result = transform(value, schema);

        // Then
        chai.expect(result).to.be.an("object");
        chai.expect(result).to.have.property("key1", "value1");
        chai.expect(result).to.have.property("key2", 123);
        chai.expect(result).to.have.property("key3", false);
    });

    it("should transform complex JSON object with complex schema", () => {
        // Given
        const value = {
            _key1: "value1",
            _key2: {
                _key3: 123,
                _key4: {
                    _key5: false,
                },
            },
        };

        const schema = {
            key1: {
                __pattern__: "_key1",
            },
            key2: {
                __pattern__: "_key2._key3",
            },
            key3: {
                key4: {
                    __pattern__: "_key2._key4._key5",
                },
            },
        };

        // When
        const result = transform(value, schema) as { [key: string]: any };

        // Then
        chai.expect(result).to.be.an("object");
        chai.expect(result).to.have.property("key1", "value1");
        chai.expect(result).to.have.property("key2", 123);
        chai.expect(result).to.have.property("key3").and.to.have.property("key4", false);
    });

    it("should ignore JSON property", () => {
        // Given
        const value = {
            _key1: "value1",
            _key2: 123,
        };

        const schema = {
            key1: {
                __pattern__: "_key2",
            },
        };

        // When
        const result = transform(value, schema);

        // Then
        chai.expect(result).to.be.an("object");
        chai.expect(result).to.have.property("key1", 123);
    });

    it("should use default value if property not exists", () => {
        // Given
        const value = {};

        const schema = {
            key1: {
                __default__: "default",
                __pattern__: "_key1",
            },
        };

        // When
        const result = transform(value, schema);

        // Then
        chai.expect(result).to.be.an("object");
        chai.expect(result).to.have.property("key1", "default");
    });

    it("should not use default value if property exists", () => {
        // Given
        const value = {
            _key: "value",
        };

        const schema = {
            key: {
                __default__: "default",
                __pattern__: "_key",
            },
        };

        // When
        const result = transform(value, schema);

        // Then
        chai.expect(result).to.be.an("object");
        chai.expect(result).to.have.property("key", "value");
    });

    it("should apply transformer", () => {
        // Given
        const value = {
            _key: "123",
        };

        const schema = {
            key: {
                __converter__: parseInt,
                __pattern__: "_key",
            },
        };

        // When
        const result = transform(value, schema);

        // Then
        chai.expect(result).to.be.an("object");
        chai.expect(result).to.have.property("key", 123);
    });

    it("should throw exception if required but not exists", () => {
        // Given
        const value = {};

        const schema = {
            key: {
                __pattern__: "_key",
                __required__: true,
            },
        };

        // When
        const fn = () => transform(value, schema);

        // Then
        chai.expect(fn).to.be.throw("Not exists: _key");
    });

    it("should not throw exception if required but exists", () => {
        // Given
        const value = {
            _key: "value",
        };

        const schema = {
            key: {
                __pattern__: "_key",
                __required__: true,
            },
        };

        // When
        const fn = () => transform(value, schema);

        // Then
        chai.expect(fn).to.be.not.throw("Not exists: _key");
    });

    it("should ignore schema if __pattern__ not exists", () => {
        // Given
        const value = {
            _key1: "value1",
        };

        const schema = {
            key1: {
                key2: "value",
            },
        };

        // When
        const result = transform(value, schema);

        // Then
        chai.expect(result).to.be.an("object");
        chai.expect(result).to.be.property("key1").and.to.be.empty;
    });
});
