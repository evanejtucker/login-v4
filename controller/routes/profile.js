const express = require('express')
const router = express.Router()
const auth = require('../passport.js');
const Users = require('../../models/Users.js');

// define the home page route
router.get('/', function (req, res, next) {
  res.render('profile' , {user: req.user});
});

router.get('/allUsers', function (req, res, next) {
  Users.find((err, user)=> {
    if (err) return console.error(err);
    res.send(user);
  })
});


module.exports = router