
import {ILogModel} from "../../client/src/app/models/ILogModel";
import {Log} from "../schemas/LogSchema";
import {ILogService} from "../interfaces/ILogService";

export class LogService implements ILogService{

    private logs : any;
    constructor() {

    }

    public get getLogs() : any {
        return Log.find({}, (err, results) =>  {
            this.logs = results;
        }).then(()=> {
            return this.logs
        });
    }

    public get logsCount() :  any {
        return Log.find({}).count();
    }

    public getLog(id:string) {
        console.log(`[LogsAPI.getLog] Retrieving Log: {id: ${id}}.`);
        return Log.find({id:id});
    }

    public addLog(item: ILogModel): void {
        Log.create(item);
    }

    public deleteLog(id: string): void {
        Log.find({id:id}).remove().exec();
    }

    public editLog( data: ILogModel): void {
        Log.findOneAndUpdate(
            {id:data.id},
            {$set:
                {
                    name : data.name,
                    path : data.path,
                    regularExpressions : data.regularExpressions,
                    typeRolling: data.typeRolling,
                    typeSpecial : data.typeSpecial,
                    startLine : data.startLine,
                    endLine : data.endLine
                }
            },
            {new:true},
            function(err, doc) {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                //
                console.log(`[LogsAPI.getLog] updated Log: {id: ${data.id}}.`);
            }
            );
    }
}