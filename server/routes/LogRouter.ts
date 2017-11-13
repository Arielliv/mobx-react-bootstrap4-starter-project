import {Router, Request, Response, NextFunction} from 'express';
import {logController} from "../controllers/logController";
import {ILogModel} from "../../client/src/app/models/ILogModel";

export class LogRouter {
    router: Router;

    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all Heroes.
     */
    public static getAll(req: Request, res: Response, next: NextFunction) {
        res.status(200)
            .send({
                message: 'Success',
                status: res.status,
                logs:logController.getLogs
            });
    }

    /**
     * GET one log by id
     */
    public static getOne(req: Request, res: Response, next: NextFunction) {
        let id = req.params.id;
        let log = logController.getLog(id);
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
    public static getCount(req: Request, res: Response, next: NextFunction) {
        res.status(200)
            .send({
                message: 'Success',
                status: res.status,
                count:logController.logsCount
            });
    }
    /**
     * POST log
     */
    public static addLog(req: Request, res: Response, next: NextFunction) {
        let log : ILogModel = req.body;
        logController.addLog(log);
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
    public static deleteLog(req: Request, res: Response, next: NextFunction) {
        console.log(req.query.id);
        let id : string = req.query.id;
        logController.deleteLog(id);
        res.status(200)
            .send({
                message: 'Success',
                status: res.status,

            });
    }
    /**
     * PUT log
     */
    public static editLog(req: Request, res: Response, next: NextFunction) {
        let log : ILogModel = req.body;
        logController.editLog(log);
        res.status(200)
            .send({
                message: 'Success',
                status: res.status,
                log
            });
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/count', LogRouter.getCount);
        this.router.get('/', LogRouter.getAll);
        this.router.get('/:id', LogRouter.getOne);
        this.router.post('/add', LogRouter.addLog);
        this.router.delete('/delete', LogRouter.deleteLog);
        this.router.put('/edit', LogRouter.editLog);
    }

}

// Create the HeroRouter, and export its configured Express.Router


export let logRoutes = new LogRouter();