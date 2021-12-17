module.exports = {
    ensureAuthenticated : (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }else{
           req.flash('error_msg', "you have to login to view dashboard");
           res.redirect('/login');
        }
    }
}