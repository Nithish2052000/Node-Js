var express= require('express');
var app =express();
var $ = require('jquery');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var loginController = require('./Controller/loginController.js')
var passport = require('passport');
var passportController = require('./config/passport.js');
//Setting up ejs as the view-engine
app.set('view engine', 'ejs');
//Database
app.use(express.static('./assets'))
const db = require('./config/keys.js').MongoURI;
//Connection with the database
mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true })
        .then(()=> {console.log('MongoDb Connected.....')})
        .catch((error) => {console.log(error)});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))       

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})
//Controller
loginController(app);
passportController(passport);
//Listening to the port
app.listen(3000);