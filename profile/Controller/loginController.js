var bodyParser = require("body-parser")
var bcrypt = require('bcrypt');
var User = require('../models/users')
var mongoose = require('mongoose');
const passport = require("passport");
//var passportController = require('../config/passport.js');
var {ensureAuthenticated} = require('../config/auth.js');
module.exports = function(app){

app.use(bodyParser.urlencoded({extended : false}));

app.get('/home', ensureAuthenticated, (req,res) => {
    var todoIncomplete = []
    var todoCompleted  = []
    User.findOne({name : req.user.name})
        .then((user) => {
            if(user.todo1){
                todoIncomplete = Object.values(JSON.parse(user.todo1));
                todoCompleted  = Object.values(JSON.parse(user.todo2));
                res.render('home', {name : req.user.name, todoIncomplete: todoIncomplete, todoCompleted: todoCompleted});
            }else{
                res.render('home', {name: req.user.name, todoIncomplete : null, todoCompleted: null})
            }
            
        })
        .catch((error) => {console.log(error)});
    //console.log(todoIncomplete);   
    
});
app.get('/logout', (req, res) => {
    req.logout();
    req.flash('succes_msg', 'You have succesfully logged out')
    res.redirect('/login');
});
app.get('/login', (req,res) => {
    res.render('login');
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local',{
        successRedirect : '/home',
        failureRedirect : '/login',
        failureFlash : true 
    })(req, res, next);
});

app.get('/register', (req,res) => {
   res.render('register');
});

app.get('*', (req, res) => {
    res.status(404).render('index');
})

app.post('/register', async (req,res) => {
var errors =[]
const {name, email, password1, password2} = req.body;
var password = await bcrypt.hash(password1, 10);
if(!name || !email || !password1 || !password2){
errors.push({msg : 'Do not leave any field empty'});
}
if(password1 !== password2){
errors.push({msg:'Passwords do not match'});
}
if(password1.length < 8 || password1.length > 50){
errors.push({msg :'Password length should be within (8-50)'});    
}
if(errors.length > 0){
    res.render('register',{
    errors, 
    name,
    email,
    password1,
    password2});
}else{
User.findOne({email:email})
    .then(user => {
         if(user){
            errors.push({msg:'Email already registered'}) 
            res.render('register',{
                errors, 
                name,
                email,
                password1,
                password2});
         }else{
            const newUser = new User({
                name,
                email,
                password
            });
            //console.log(newUser);
            //console.log(password1);
            //console.log(hashedPassword)
            newUser.save()
                   .then((user)=> {
                       //console.log('user registered successfully');
                       req.flash('succes_msg', 'You are now Registered and you can login');
                       res.redirect('/login');
                       })
                   .catch((error) => {console.log(error)});
            }
     })
    .catch((e) => {console.log(e)}) 
}
});
app.post('/home', (req, res) => {
    var {name, todo1, todo2} = JSON.parse(JSON.stringify(req.body));
    //todoIncomplete = toString(todo1);
    //todoCompleted  = toString(todo2);
    User.findOneAndUpdate({name : name}, {$set :{todo1 :todo1, todo2 : todo2}})
        .then((user) => {
            console.log("Updated user");
           //console.log(user);
        })
        .catch((error) => {
            console.log(error);
        });   
    //console.log(name);
    //console.log(JSON.parse(todo1));
    //console.log(JSON.parse(todo2));
    //var todos = JSON.parse(JSON.stringify(req.body));
    //console.log(todos);
    //res.redirect('/register');
});
}