
import {ILogModel} from "../../client/src/app/models/ILogModel";

export class service {

    private logs : ILogModel[];

    constructor(defaults: ILogModel[]) {
        this.logs = defaults;
    }

    public get getLogs() : ILogModel[] {
        return this.logs;
    }

    public get logsCount() :  number {
        return this.logs.length;
    }

    public getLog(id:string) {

        if (typeof id === "undefined" || id === null) {
            // res.sendStatus(404);
            // next();
            return;
        }
    }

    public addLog(item: ILogModel): void {
        this.logs.push(item);
    }

    public deleteLog(id: string): void {
        this.logs = this.logs.filter((log) => log.id !== id);
    }

    public editLog( data: ILogModel): void {
        this.logs = this.logs.map((log) => {
            if (log.id === data.id) {
                log = data;
            }
            return log;
        });
    }
}
export let LogService = new service([]);