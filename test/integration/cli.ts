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
import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";

import temp = require("temp");

describe("cli", () => {
    let executablePath: string;
    before(() => executablePath = path.join(__dirname, "..", "..", "bin", "json-structure-schema.js"));

    it("should print usage", (done) => {
        // Given
        let stdout = "";
        const args = [executablePath];

        // When
        const process = child_process.spawn("node", args);
        process.stdout.on("data", (message: Buffer) => {
            stdout = message.toString("utf-8");
        });

        process.on("close", (status) => {
            // Then
            chai.expect(status).to.be.a("number").and.equal(0);
            chai.expect(stdout).to.be.a("string").and.contain("Usage: json-structure-schema <file> <schema>");
            done();
        });
    });

    it("should print help", (done) => {
        // Given
        let stdout = "";
        const args = [executablePath, "--help"];

        // When
        const process = child_process.spawn("node", args);
        process.stdout.on("data", (message: Buffer) => {
            stdout = message.toString("utf-8");
        });

        process.on("close", (status) => {
            // Then
            chai.expect(stdout).to.be.a("string").and.contain("Usage: json-structure-schema <file> <schema>");
            done();
        });
    });

    it("should return transformed simple JSON object", (done) => {
        // Given
        let stdout = "";

        const valuePath = path.join(__dirname, "resource/simple/value.json");
        const schemaPath = path.join(__dirname, "resource/simple/schema.json");
        const args = [executablePath, valuePath, schemaPath];

        // When
        const process = child_process.spawn("node", args);
        process.stdout.on("data", (message: Buffer) => {
            stdout = message.toString("utf-8");
        });

        process.on("close", (status) => {
            // Then
            chai.expect(stdout).to.be.a("string").and.contain("{\"key\":\"value\"}");
            done();
        });
    });

    it("should return transformed pretty JSON object", (done) => {
        // Given
        let stdout = "";

        const valuePath = path.join(__dirname, "resource/simple/value.json");
        const schemaPath = path.join(__dirname, "resource/simple/schema.json");
        const args = [executablePath, valuePath, schemaPath, "--pretty"];

        // When
        const process = child_process.spawn("node", args);
        process.stdout.on("data", (message: Buffer) => {
            stdout = message.toString("utf-8");
        });

        process.on("close", (status) => {
            // Then
            chai.expect(stdout).to.be.a("string").and.contain("{\n    \"key\": \"value\"\n}\n");
            done();
        });
    });

    it("should return transformed pretty JSON object with custom space", (done) => {
        // Given
        let stdout = "";

        const valuePath = path.join(__dirname, "resource/simple/value.json");
        const schemaPath = path.join(__dirname, "resource/simple/schema.json");
        const args = [executablePath, valuePath, schemaPath, "--pretty", "--pretty-space", "1"];

        // When
        const process = child_process.spawn("node", args);
        process.stdout.on("data", (message: Buffer) => {
            stdout = message.toString("utf-8");
        });

        process.on("close", (status) => {
            // Then
            chai.expect(stdout).to.be.a("string").and.contain("{\n \"key\": \"value\"\n}\n");
            done();
        });
    });

    it("should save transformed JSON object in temporary file", (done) => {
        // Given
        let stdout = "";

        const valuePath = path.join(__dirname, "resource/simple/value.json");
        const schemaPath = path.join(__dirname, "resource/simple/schema.json");
        const outFile = temp.path({ suffix: ".json " });

        const args = [executablePath, valuePath, schemaPath, "--out", outFile];

        // When
        const process = child_process.spawn("node", args);
        process.stdout.on("data", (message: Buffer) => {
            stdout = message.toString("utf-8");
        });

        process.on("close", (status) => {
            // Then
            const outFileRawContent = fs.readFileSync(outFile);
            const outFileContent = outFileRawContent.toString("utf-8");

            chai.expect(stdout).to.be.empty;
            chai.expect(outFileContent).to.be.a("string").and.eql("{\"key\":\"value\"}");
            done();
        });
    });

    it("should save transformed pretty JSON object in temporary file", (done) => {
        // Given
        let stdout = "";

        const valuePath = path.join(__dirname, "resource/simple/value.json");
        const schemaPath = path.join(__dirname, "resource/simple/schema.json");
        const outFile = temp.path({ suffix: ".json " });

        const args = [executablePath, valuePath, schemaPath, "--pretty", "--out", outFile];

        // When
        const process = child_process.spawn("node", args);
        process.stdout.on("data", (message: Buffer) => {
            stdout = message.toString("utf-8");
        });

        process.on("close", (status) => {
            // Then
            const outFileRawContent = fs.readFileSync(outFile);
            const outFileContent = outFileRawContent.toString("utf-8");

            chai.expect(stdout).to.be.empty;
            chai.expect(outFileContent).to.be.a("string").and.eql("{\n    \"key\": \"value\"\n}");
            done();
        });
    });

    it("should save transformed pretty JSON object with custom space in temporary file", (done) => {
        // Given
        const valuePath = path.join(__dirname, "resource/simple/value.json");
        const schemaPath = path.join(__dirname, "resource/simple/schema.json");
        const outFile = temp.path({ suffix: ".json " });

        const args = [executablePath, valuePath, schemaPath, "--pretty", "--pretty-space", "1", "--out", outFile];

        // When
        const process = child_process.spawn("node", args);
        process.on("close", (status) => {
            // Then
            const outFileRawContent = fs.readFileSync(outFile);
            const outFileContent = outFileRawContent.toString("utf-8");

            chai.expect(outFileContent).to.be.a("string").and.eql("{\n \"key\": \"value\"\n}");
            done();
        });
    });
});
