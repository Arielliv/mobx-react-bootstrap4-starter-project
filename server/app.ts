import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as routes from './routes/index';
import * as mongoose from "mongoose";
import {LogRouter, logRoutes} from "./routes/LogRouter";

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public app: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.app = express();
        // Mongo
        this.connectToMongo();
        this.middleware();
        this.routes();
    }


    /**
     * Connect to mongo
     */
    private connectToMongo() {

        //
        // Connect to mongo using mongoose
        mongoose.connect('mongodb://localhost/test');
    }

    // Configure Express middleware.
    private middleware(): void {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }


    // Configure API endpoints.
    private routes(): void {
        //set public
        this.app.use(express.static('../public'));

        let router = express.Router();

        this.app.use('/', router);
        this.app.use('/api/logs', logRoutes.router);

        // redirect if nothing else sent a response
        this.app.use(redirectUnmatched);
        function redirectUnmatched(req, res) {
            res.redirect("/");
        }
    }

}

export default new App().app;