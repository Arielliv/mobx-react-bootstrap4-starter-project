import {observable, action, computed} from 'mobx';
import {asyncAction} from "mobx-utils"
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
  private logs: Array<ILogModel>;

  @computed
  get getLogs() {
      return this.logs;
  }
  @computed
  get logsCount() {
      return this.logs.length;
  }

  @action
  getLog(id:string) {
      return this.logs.filter((log) => log.id === id);
  }
  @action
  addLog(item: ILogModel): void {
    this.logs.push(item);
    localStorage.setItem( 'defaultLogs', JSON.stringify(this.logs));
  }

  @action
  deleteLog(id: string): void {
    this.logs = this.logs.filter((log) => log.id !== id);
    localStorage.setItem( 'defaultLogs', JSON.stringify(this.logs));
  }

  @action
  editLog( data: ILogModel): void {
    this.logs = this.logs.map((log) => {
      if (log.id === data.id) {
        log = data;
      }
      localStorage.setItem( 'defaultLogs', JSON.stringify(this.logs));
      return log;
    })
  }
}

export default LogArrayStore ;
