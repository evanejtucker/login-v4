const express = require('express')
const router = express.Router()
const auth = require('../passport.js');
const Users = require('../../models/Users.js');

// define the home page route
router.get('/', function (req, res, next) {
  res.render('profile' , {user: req.user, message: req.flash('adminMessage')});
});

router.get('/allUsers', auth.checkAdminister, function (req, res, next) {
  Users.find((err, user)=> {
    if (err) return console.error(err);
    res.send(user);
  })
});

router.get('/admin', auth.checkAdminister, function(req, res, next) {
  Users.find((err, users)=> {
    if(err) return console.log(err);
    let allUsers = users; 
    res.render('admin', {user: req.user, allUsers: allUsers});
  });
});


module.exports = router