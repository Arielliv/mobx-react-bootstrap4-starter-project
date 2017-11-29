"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const LogRouter_1 = require("../server/routes/LogRouter");
const request = require("supertest");
const chai_1 = require("chai");
let logServiceMock;
const toApp = (mock) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(new LogRouter_1.LogRouter(mock).router);
    return app;
};
beforeEach(() => {
    logServiceMock = {
        getLogs() {
            throw new Error('Not implemented yet.');
        },
        logsCount() {
            throw new Error('Not implemented yet.');
        },
        getLog(id) {
            throw new Error('Not implemented yet.');
        },
        addLog(item) {
            throw new Error('Not implemented yet.');
        },
        deleteLog(id) {
            throw new Error('Not implemented yet.');
        },
        editLog(data) {
            throw new Error('Not implemented yet.');
        }
    };
});
// Create a test suite (group) called Math
describe('server side', function () {
    describe('log controller', function () {
        describe('get one log', () => {
            logServiceMock.getLog = () => Promise.resolve({
                id: "1",
                name: "alon",
                path: "alone_home",
                regularExpressions: [{ id: "1", regularExpression: "s" }],
                typeRolling: "true",
                typeSpecial: "true",
                startLine: "true",
                endLine: "true"
            });
            return request(toApp(logServiceMock)).get("1")
                .expect(200).then(response => {
                let log = response.body.log;
                chai_1.expect(log.name).to.equal("alone");
            });
        });
    });
});
//# sourceMappingURL=test.js.map