const express = require('express')
const router = express.Router()
const auth = require('../passport.js');
const Users = require('../../models/Users.js');
const passport = require('passport');

router.get('/', (req, res, next) =>  {
    res.render('index', {user: req.user, message: req.flash('loginMessage')});
});

router.get('/signup', (req, res, next)=> {
    res.render('index', {user: req.user, message: req.flash('accountMessage')});
});

router.get('/failure', (req, res, next) =>  {
    res.render('index', {message: req.flash('loginMessage')});
});

router.get('/logout', auth.logoutUser, (req, res, next)=> {
    res.render('index', {message: req.flash('logoutMessage')});
})

router.post('/login',
  passport.authenticate('local', { successRedirect: '/profile',
                                   failureRedirect: '/failure',
                                   failureFlash: true })
);

router.post('/newUser', (req, res, next) => {
    let info = req.body;
    Users.findOne({username: info.newUsername}, (err, user)=> {
        if(user) {
            req.flash('accountMessage', 'user already exists :(');
            console.log('user already exists');
            res.redirect('/signup');
        } else {
            let newUser = new Users({
                username: info.newUsername, 
                password: info.confirmPassword,
                firstName: info.firstName,
                lastName: info.lastName,
                email: info.email,
                administer: false
            });
            newUser.password = newUser.generateHash(info.confirmPassword);
            console.log(newUser);
            req.flash('accountMessage', 'something went wrong :(');
            newUser.save((error)=> {
                if (error) return console.log(error);
                req.flash('accountMessage', 'successfully created user :)');
            });
            res.redirect('/signup');
        }
    });
    
});
  
module.exports = router