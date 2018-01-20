const express = require('express')
const router = express.Router()
const auth = require('../passport.js');
const Users = require('../../models/Users.js');
const passport = require('passport');

router.get('/', (req, res, next) =>  {
    res.render('index' , {name: 'Evan'});
});

router.get('/failure', (req, res, next) =>  {
    console.log(req.body);
    res.render('index', {message: 'not authenticated'})
});

router.get('/logout', auth.logoutUser, (req, res, next)=> {
    res.redirect('/');
})

router.post('/login',
  passport.authenticate('local', { successRedirect: '/profile',
                                   failureRedirect: '/failure'})
);

router.post('/newUser', (req, res, next) => {
    let info = req.body;
    Users.findOne({username: info.newUsername}, (err, user)=> {
        if(user) {
            console.log('user already exists');
        } else {
            console.log('no user by that name');
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
            newUser.save((error)=> {
                if (error) return console.log(error);
                console.log('user saved successfully');
            });
        }
    });
    res.redirect('/');
});
  
module.exports = router