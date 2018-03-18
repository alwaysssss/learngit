var express = require('express');
var APP = express();
var swig = require('swig');
var bodyParser = require('body-parser');
var Cookies = require('cookies');

APP.use('/public',express.static(__dirname+'/public'));
APP.use(bodyParser.urlencoded({extended:true}));
APP.use(bodyParser.json({limit:'50mb'}));
APP.use(bodyParser.urlencoded({limit:'50mb',extended:true}));

APP.engine('html',swig.renderFile);
APP.set('views','./views');
APP.set('view engine','html');
swig.setDefaults({cache:false});

APP.use(function(req,res,next){
    req.cookies = new Cookies(req,res);
    req.result = {};
    if(req.cookies.get("userInfo")){
        req.userInfo = JSON.parse(req.cookies.get("userInfo"));
        req.userInfo.uname = decodeURI(req.userInfo.uname);
    }
    next();
});

APP.use('/api',require("./routers/api"));
APP.use('/admin',require('./routers/admin'));
APP.use('/',require('./routers/main'));
APP.use('/diary',require('./routers/diary'));
APP.use('/message',require('./routers/message'));

APP.listen(8081,'localhost');

