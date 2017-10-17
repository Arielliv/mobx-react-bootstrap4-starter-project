import {observable, action, computed} from 'mobx';
import {  } from '../models';
import {ILogModel} from "../models/ILogModel";

export class LogArrayStore {

  constructor(defaults: ILogModel[]) {
    this.logs = defaults;
    this.addLog = this.addLog.bind(this);
    this.deleteLog = this.deleteLog.bind(this);
    this.editLog = this.editLog.bind(this);
  }

  @observable
  public logs: Array<ILogModel>;

  @computed
  get viewLogs() {
      return this.logs;
  }
  @computed
  get logsCount() {
      return this.logs.length;
  }
  @action
  addLog(item: ILogModel): void {
    this.logs.push(item);
  }

  @action
  deleteLog(id: string): void {
    this.logs = this.logs.filter((todo) => todo.id !== id);
  }

  @action
  editLog(id: string, data: ILogModel): void {
    this.logs = this.logs.map((log) => {
      if (log.id === id) {
        log = data;
      }
      return log;
    })
  }
}

export default LogArrayStore ;
