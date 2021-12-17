const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var User = require('../models/users')

module.exports = function (passport){
  passport.use(
      new LocalStrategy({usernameField : 'name'}, (name, password, done) => {
         User.findOne({name : name})
             .then(user => {
                            if(!user){
                                  return done(null, false, {message : 'The User is not registered'});
                                     }
                            bcrypt.compare(password, user.password, (err, isMatch) => {
                              if(err){
                                console.log(err)
                              }
                              if(isMatch){
                                return done(null, user)
                              }else{
                                return done(null, false, {message : 'The password is incorrect'})
                              }
                            })
                            return done(null, user);
                            })                                     
             .catch((error) => {console.log(error)})
      })
  )
passport.serializeUser((user, done) => {
done(null, user.id);
});

passport.deserializeUser((id, done) => {
User.findById(id, (err, user) => {
    done(err, user);
});
});
}
