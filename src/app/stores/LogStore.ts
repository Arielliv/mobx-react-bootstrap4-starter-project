import { observable, action } from 'mobx';
import {  } from '../models';
import {ILogModel} from "../models/LogModel";

export class LogsStore {

    constructor(props) {

    }

    @observable
    public logs: ILogModel;

}

export default LogsStore;
