import {observable, action, computed} from 'mobx';
import {asyncAction} from "mobx-utils"
import {  } from '../models';
import {ILogModel} from "../models/ILogModel";
import axios from 'axios';

export class LogArrayStore {

  constructor(defaults: ILogModel[]) {
    this.logs = defaults;
    this.addLog = this.addLog.bind(this);
    this.deleteLog = this.deleteLog.bind(this);
    this.editLog = this.editLog.bind(this);
  }

  @observable
  private logs: ILogModel[];

  @computed
  get getLogs() {
    return axios.get('api/logs')
        .then((response) => {
            console.log(response);
            return response.data;

        })
        .catch((error) =>{
          console.log(error);
        });
    // return this.logs
  }
  @computed
  get logsCount() {
      return this.logs.length;
  }

  @asyncAction
  *getLog(id:string) {
          try {
              const response = yield axios.get('api/logs/:'+id);
              const log : ILogModel = response.data.log;
              console.log(
                  response.data
              );
              return log
          } catch (error) {
              console.log(error);
          }

      // return this.logs.filter((log) => log.id === id);
  }
  @asyncAction
  *addLog(item: ILogModel) {
      try {
          const response = yield axios.post('api/logs/add',item);
          this.logs.push(item);
          console.log(
              response.data
          );
      } catch (error) {
          console.log(error);
      }
    // this.logs.push(item);
    // localStorage.setItem( 'defaultLogs', JSON.stringify(this.logs));
  }

  @asyncAction
  *deleteLog(id: string) {
      try {
          const response = yield axios.delete('api/logs/delete',{params:{id:id}});
          this.logs = this.logs.filter((log) => log.id !== id);
          console.log(
              response.data
          );
      } catch (error) {
          console.log(error);
      }
    // this.logs = this.logs.filter((log) => log.id !== id);
    // localStorage.setItem( 'defaultLogs', JSON.stringify(this.logs));
  }

  @asyncAction
  *editLog( data: ILogModel) {
      try {
          const response = yield axios.put('api/logs/edit',data);
          this.logs = this.logs.map((log) => {
            if (log.id === data.id) {
              log = data;
            }
            return log;
          });
          console.log(
              response.data
          );
      } catch (error) {
          console.log(error);
      }
    // this.logs = this.logs.map((log) => {
    //   if (log.id === data.id) {
    //     log = data;
    //   }
    //   localStorage.setItem( 'defaultLogs', JSON.stringify(this.logs));
    //   return log;
    // });
  }
}

export default LogArrayStore ;
