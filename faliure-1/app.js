var express = require('express');
var loginController = require('./Controller/loginController.js');
var todoController = require('./Controller/todoController.js')
var app = express();
var passport =require('passport');
var initializePassport = require('./passport-config.js')

app.set('view engine', 'ejs');
//app.use('assets', express.static('./assets'));
app.use(express.static('./assets'));
loginController(app, passport, initializePassport);
todoController(app, passport, initializePassport, loginController);
app.get('/', (req, res) => {
    res.sendFile(__dirname +'/index.html');
    
 });

app.listen(3000);