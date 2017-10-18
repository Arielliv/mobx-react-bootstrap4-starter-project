import {observable, action, computed} from 'mobx';
import {ILogModel} from "../models/ILogModel";

export class LogStore {

    constructor() {
        this.flag = false;
        this.addLog = this.addLog.bind(this);
        this.setEditFlag = this.setEditFlag.bind(this);


    }

    @observable
    public log: ILogModel;

    @observable
    public flag: boolean;

    @computed
    get getEditFlag() {
        return this.flag;
    }

    @computed
    get getLog() {
        return this.log;
    }

    @action
    addLog(log: ILogModel): void {
        this.log = log;
    }

    @action
    setEditFlag(flag : boolean): void {
        this.flag = flag;
    }

}

export default LogStore ;
