
import {ILogModel} from "../../client/src/app/models/ILogModel";
import {Log} from "../schemas/LogSchema";

export class service {

    private logs : any;
    constructor() {

    }

    public get getLogs() : any {
        return Log.find({}, (err, results) =>  {
            this.logs = results;
        }).then(()=> {
            return this.logs
        });
        // return this.logs;
    }

    public get logsCount() :  any {
        return Log.find({}).count();
        // return this.logs.length;
    }

    public getLog(id:string) {
        //log
        console.log(`[LogsAPI.getLog] Retrieving Log: {id: ${id}}.`);

        //find user
        return Log.find({id:id});
    }

    public addLog(item: ILogModel): void {
        Log.create(item);
        // this.logs.push(item);
    }

    public deleteLog(id: string): void {
        Log.find({id:id}).remove().exec();
        // this.logs = this.logs.filter((log) => log.id !== id);
    }

    public editLog( data: ILogModel): void {
        // Log.find({}).update({$set:
        //     {
        //         name : data.name,
        //         path : data.path,
        //         regularExpressions : data.regularExpressions,
        //         typeRolling: data.typeRolling,
        //         typeSpecial : data.typeSpecial,
        //         startLine : data.startLine,
        //         endLine : data.endLine
        //     }
        // },{new:true}, function(err, doc) {
        //     if (err) {
        //         console.log("Something wrong when updating data!");
        //     }
        //
        //     console.log(doc)
        // });
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
        // this.logs = this.logs.map((log) => {
        //     if (log.id === data.id) {
        //         log = data;
        //     }
        //     return log;
        // });
    }
}
export let LogService = new service();