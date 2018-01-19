
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/Users.js');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      Users.findOne({ username: username }, function (err, user) {
          if (err) { return console.log(err); }
          if (!user) {
              console.log("no user found");
              return done(null, false); 
          }
          if (user) {
            return done(null, user);
          }
        });
    }
));


module.exports = {
    passport: passport,
    checkAuthentication: (req, res, next)=> {
        if(req.isAuthenticated()){
            //if user is looged in, req.isAuthenticated() will return true 
            console.log('user authenticated');
            next();
        } else{
            console.log("user not authenticated");
            res.redirect("/failure");
        }
    },
    logoutUser: (req, res, next)=> {
        if(req.isAuthenticated()){
            req.logout();
            console.log('user logged out');
            next();
        } else {
            console.log('user not logged in');
            next();
        }
    }
}