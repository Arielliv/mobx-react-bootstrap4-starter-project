
import {ILogModel} from "../../client/src/app/models/ILogModel";
import {ILogService} from "../interfaces/ILogService";

export class LogController {

    private logService : ILogService;

    constructor(logService : ILogService) {
        this.logService = logService;
    }

    public get getLogs() : any {
        return this.logService.getLogs;
    }

    public get logsCount() :  any {
        return this.logService.logsCount;
    }

    public getLog(id:string) {
        return this.logService.getLog(id);
    }

    public addLog(item: ILogModel): void {
        this.logService.addLog(item);
    }

    public deleteLog(id: string): void {
        this.logService.deleteLog(id);
    }

    public editLog( data: ILogModel): void {
        this.logService.editLog(data);
    }
}