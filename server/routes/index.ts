
'use strict';

import * as express from 'express';
import * as path from 'path';
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../../public/','index.html'));
});

router.get('/public/*', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../../public/',req.params[0]));
});


export = router;