var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
module.exports = function intialize(passport, getUserBYEmail, getUserById){
    const autehnticateUser = async(email, password, done) => {
        const user = getUserBYEmail(email);
        if(user == null){
            return done(null, false, {messages: 'User not availabe'})
        }     
        try{
          if(await bcrypt.compare(password, user.password)){
            return done(null, user)
          }else{
            return done(null, false, {messages : 'Password Incorrect'})
          }
        }catch(e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField : 'email'}, autehnticateUser));
    passport.serializeUser((user, done) => { return done(null, user.id) })
    passport.deserializeUser((user, done) => { return done(null, getUserById(id))})
}