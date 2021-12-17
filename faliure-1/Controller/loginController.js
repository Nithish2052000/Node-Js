if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
  }
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');
var flash = require('express-flash');

//var intialize =require('');
var users = [];
module.exports = function(app, passport, initializePassport){
    app.use(bodyParser.urlencoded({ extended : false}));
    app.use(flash())
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    initializePassport(passport, 
        email => {
            return users.find(user => user.email === email)
                },
        id => {
            return users.find(user =>user.id === id)
        }        
    );
    app.get('/login', (req, res) => {
        res.render('login');
    })
    app.post('/login', passport.authenticate('local', {
         successRedirect : '/',
         failureRedirect : '/login',
         failureFlash : true 
    }))
    app.get('/register',  (req, res) => {
        res.render('register');
    })
    app.post('/register', async (req, res) => {
        var hashedPassword = await bcrypt.hash(req.body.password, 10);
        try {
            users.push({
            id: Date.now().toString(),    
            name: req.body.name,
            email:req.body.email,
            password:hashedPassword
        });
        console.log(users);
        res.redirect('/login');
            }catch{
            req.redirect('/register');
        }
    })
}
ECE
//108117021-1 
//108117009-2
//108117094-3
CSE
//106117072-4p
//106117107-5v
CIVIL
//103117016-6
//103117033-7
//103117070-8
//103117075-9
//103117085-10
EEE
//107117016-11a
//107117046-12j 
ICE
//110117048(madhu)-13
//110117069rb -14
//110117082lsk-15
//110117099vk-16
Chemical
//111117088s-17 
Metallurgy
//112117048ss-18 
//112117056rm-19
*
//102117003(sani)-20 