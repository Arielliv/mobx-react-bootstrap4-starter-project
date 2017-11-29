// Require the built in 'assertion' library
import * as assert from "assert";
import {ILogService} from "../server/interfaces/ILogService";
import * as express from "express";
import bodyParser = require("body-parser");
import {LogRouter} from "../server/routes/LogRouter";
import {ILogModel} from "../client/src/app/models/ILogModel";
import * as request from "supertest";
import { expect } from 'chai';
import * as logger from 'morgan';
import App from '../server/app';
import * as http from 'http';
let logServiceMock : ILogService;

const toApp = (mock : ILogService) =>{
    App.use('3000');
    App.use(new LogRouter(mock).router);
    // const app = express();
    // app.use('3000');
    // app.use(bodyParser.json());
    // app.use(new LogRouter(mock).router);
    return App;
};

beforeEach(()=>{
    logServiceMock = {
        getLogs() : any {
            throw new Error('Not implemented yet.')
        },
        logsCount() :  any  {
            throw new Error('Not implemented yet.')
        },
        getLog(id:string) : any {
            throw new Error('Not implemented yet.')
        },
        addLog(item: ILogModel): void {
            throw new Error('Not implemented yet.')
        },
        deleteLog(id: string): void  {
            throw new Error('Not implemented yet.')
        },
        editLog( data: ILogModel): void  {
            throw new Error('Not implemented yet.')
        }
    }
});
// Create a test suite (group) called Math
describe('server side', () => {
    describe('log controller', () => {
        it('get one log', () => {
            logServiceMock.getLog = () =>
                Promise.resolve({
                    id : "1",
                    name : "alon",
                    path : "alone_home",
                    regularExpressions : [{id:"1",regularExpression:"s"}],
                    typeRolling: "true",
                    typeSpecial : "true",
                    startLine : "true",
                    endLine : "true"});

            return request(toApp(logServiceMock)).get("1")
                .expect(200).then(response => {
                    let log = response.body.log;
                    expect(log.name).to.equal("alone");
                })
        });
    });
});