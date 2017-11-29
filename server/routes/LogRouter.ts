import {Router, Request, Response, NextFunction} from 'express';
import {LogController} from "../controllers/LogController";
import {ILogModel} from "../../client/src/app/models/ILogModel";
import {LogService} from "../services/LogService";
import {ILogService} from "../interfaces/ILogService";

export class LogRouter {
    router: Router;
    private logController : LogController;
    /**
     * Initialize the HeroRouter
     */
    constructor(logService : ILogService) {
        this.router = Router();
        this.logController = new LogController(logService);
        this.init();
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/count', this.getCount.bind(this));
        this.router.get('/', this.getAll.bind(this));
        this.router.get('/:id', this.getOne.bind(this));
        this.router.post('/add', this.addLog.bind(this));
        this.router.delete('/delete', this.deleteLog.bind(this));
        this.router.put('/edit', this.editLog.bind(this));
    }

    /**
     * GET all Heroes.
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
        this.logController.getLogs.then(function (result) {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    logs:result
                });
        });

    }

    /**
     * GET one log by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {
        let id = req.params.id;
        let log = this.logController.getLog(id);
        if (log) {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    log
                });
        }
        else {
            res.status(404)
                .send({
                    message: 'No log found with the given id.',
                    status: res.status
                });
        }
    }
    /**
     * GET logs count
     */
    public getCount(req: Request, res: Response, next: NextFunction) {
        res.status(200)
            .send({
                message: 'Success',
                status: res.status,
                count:this.logController.logsCount
            });
    }
    /**
     * POST log
     */
    public addLog(req: Request, res: Response, next: NextFunction) {
        let log : ILogModel = req.body;
        this.logController.addLog(log);
        res.status(200)
            .send({
                message: 'Success',
                status: res.status,
                log
            });
    }
    /**
     * DELETE log
     */
    public deleteLog(req: Request, res: Response, next: NextFunction) {
        console.log(req.query.id);
        let id : string = req.query.id;
        this.logController.deleteLog(id);
        res.status(200)
            .send({
                message: 'Success',
                status: res.status,

            });
    }
    /**
     * PUT log
     */
    public editLog(req: Request, res: Response, next: NextFunction) {
        let log : ILogModel = req.body;
        this.logController.editLog(log);
        res.status(200)
            .send({
                message: 'Success',
                status: res.status,
                log
            });
    }
}

// Create the HeroRouter, and export its configured Express.Router


export let logRoutes = new LogRouter(new LogService());