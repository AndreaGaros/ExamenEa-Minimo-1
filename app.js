/**
 * Created by Andrea on 21/11/2016.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var mongoose = require('mongoose');



//Indexing routes
var routes = require('./app/routes/index');
var Students = require('./app/routes/studentsroutes');
var Subjects = require('./app/routes/subjectsroutes');

//Declarate express
var app = express();


//Mongose conection
var database = require('./bin/database');
mongoose.connect(database.url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// use connect-flash for flash messages stored in session
app.use(flash());


//CORS header
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin');
    res.header("Access-Control-Max-Age", "86400"); // 24 hours

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

//Routes where api calls
app.use('/', routes);
app.use('/students', Students);
app.use('/subjects', Subjects);

module.exports = app;

