
import {ILogModel} from "../../client/src/app/models/ILogModel";
import {LogService} from "../services/LogService";

export class controller {



    constructor() {

    }

    public get getLogs() : any {
        return LogService.getLogs;
        // return this.logs;
    }

    public get logsCount() :  number {
        return LogService.logsCount;
        // return this.logs.length;
    }

    public getLog(id:string) {
        return LogService.getLog(id);
        // return this.logs.filter((log) => log.id === id);
    }

    public addLog(item: ILogModel): void {
        LogService.addLog(item);
        // this.logs.push(item);
    }

    public deleteLog(id: string): void {
        LogService.deleteLog(id);
        // this.logs = this.logs.filter((log) => log.id !== id);
    }

    public editLog( data: ILogModel): void {
        LogService.editLog(data);
        // this.logs = this.logs.map((log) => {
        //     if (log.id === data.id) {
        //         log = data;
        //     }
        //     return log;
        // });
    }
}
export let LogController = new controller();