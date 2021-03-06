var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cacheControl = require('express-cache-controller');

var indexRouter = require('./routes/index');
var cors = require('cors');
let apicache = require('apicache');

let cache = apicache.middleware
 
var app = express();

app.use(cache('1 day'))
app.use(cors());

app.use(cacheControl({
    maxAge: 30
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
