
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
    {passReqToCallback : true},
    function(req, username, password, done) {
      Users.findOne({ username: username }, function (err, user) {
          if (err) { return console.log(err); }
          if (!user) {
              console.log("no user found");
              return done(null, false, req.flash('loginMessage', 'no user found')); 
          }
          if (user) {
              if(user.validPassword(password, user.password)) {
                console.log("password correct");
                return done(null, user);
              } else {
                console.log('password incorrect');
                return done(null, false, req.flash('loginMessage', 'incorrect password')); 
            }
          }
        });
    }
));


module.exports = {
    passport: passport,
    checkAuthentication: (req, res, next)=> {
        if(req.isAuthenticated()){
            console.log('user authenticated');
            next();
        } else{
            console.log("user not authenticated");
            res.render("index", {message: 'not logged in'});
        }
    },
    logoutUser: (req, res, next)=> {
        if(req.isAuthenticated()){
            req.logout();
            req.flash('logoutMessage', 'Successfully Logged Out!');
            next();
        } else {
            next();
        }
    },

    checkAdminister: (req, res, next)=> {
        if (req.user.administer) {
            next();
        } else {
            console.log('sorry, you must be an administer to continue');
            res.render('/profile', {message: 'sorry, you must be an administer to continue'})
        }
        
    }
}