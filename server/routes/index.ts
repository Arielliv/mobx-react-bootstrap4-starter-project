
'use strict';

import * as express from 'express';
import * as path from 'path';
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../../client','/dist/index.html'));
});

router.get('/dist/*', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../../client/dist/',req.params[0]));
});

router.get('/node_modules/*', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../../client/dist/',req.params[0]));
});

export = router;