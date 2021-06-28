//const mongoose = require('mongoose');
require('dotenv').config();

const express = require('express');
const favicon = require('serve-favicon');
//const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

const app = express();

// require database configuration
require('./configs/db.config');

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// Express View engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// to connect a router within an app we need to use app.use on line 33 (telling the application that whenever we look for the home folder, we need to look for the indexRouter)
// we are requiring routes/index - this is a model file (not intended to work on its own, needs to be exported)
const indexRouter = require('./routes/index.routes');
app.use('/', indexRouter);
// previously was communicating directly with the / here (the home route, now forwarding this information to the index.routes.js page for it to be used)
//      |  |  |
//      |  |  |
//      V  V  V
const booksRouter = require('./routes/book.routes')
app.use('/books', booksRouter); 
// this shows the link with with the book.routes file and tells app.js to use it
// telling app.js to use the book.routes file for everything in the browser (all URLS) starting with /books

// index router mansers the main route, books router refers to the books route
module.exports = app;
