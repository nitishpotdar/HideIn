var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var index = require('./routes/index');
var mongo = require('mongodb');
var monk = require('monk');
var ObjectId = require('mongodb').ObjectID;
var db = monk('localhost:27017/test');

var app = express();

//View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

app.use(function(req,res,next)
		{
			req.db = db;
			next();
		});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(session( {secret: "String for encrypting cookies.",saveUninitialized: true,
    resave: true } ));

app.use('/', index);

module.exports = app;
app.listen(6565);