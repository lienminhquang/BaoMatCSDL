const express = require('express');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
var shortid = require('shortid');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('fafadfdsfaf'));

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

// user require
var authMiddleware = require('./middlewares/auth.middleware');
var indexController = require('./controller/index.controller');
var authRoute = require('./route/auth.route');

app.use('/auth', authRoute);

app.get('/',authMiddleware.requireAuth, indexController.index);


app.listen(port, function(){
    console.log("Server listening on port 3000, with nodemon");
});

