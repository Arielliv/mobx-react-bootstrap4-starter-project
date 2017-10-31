'use strict';

import * as express from 'express';
import * as  bodyParser from 'body-parser';
import * as  session from 'express-session';
import * as routes from './routes/index';

const app = express();

//set public
app.use(express.static('../public'));

app.use('/', routes);
app.use('/public/*', routes);

export = app;