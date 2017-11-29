import {ILogModel} from "../../client/src/app/models/ILogModel";

export interface ILogService {
    // logs : any;
    getLogs() : any;
    logsCount() :  any ;
    getLog(id:string) : any;
    addLog(item: ILogModel): void ;
    deleteLog(id: string): void ;
    editLog( data: ILogModel): void ;
}
