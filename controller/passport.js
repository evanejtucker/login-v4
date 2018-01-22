
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
              return done(null, false, {message: 'no user found'}); 
          }
          if (user) {
              if(user.validPassword(password, user.password)) {
                console.log("password correct");
                return done(null, user);
              } else {
                console.log('password incorrect');
                return done(null, false); 
            }
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
            res.redirect("/failure", {message: 'user not logged in'});
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
    },

    checkAdminister: (req, res, next)=> {
        if (req.user.administer) {
            next();
        } else {
            console.log('sorry, you must be an administer to continue');
            res.redirect('/profile', {message: 'sorry, you must be an administer to continue'})
        }
        
    }
}