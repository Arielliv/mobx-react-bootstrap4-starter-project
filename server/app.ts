'use strict';

import * as express from 'express';
import * as  bodyParser from 'body-parser';
import * as  session from 'express-session';
import * as routes from './routes/index';

const app = express();

app.use(express.static('client/dist'));
app.use('/', routes);
app.use('/dist/*', routes);
app.use('/node_modules/*', routes);

export = app;