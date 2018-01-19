var express = require('express')
var router = express.Router()

// define the home page route
router.get('/', function (req, res, next) {
  res.send('profile');
});

router.get('/allUsers', function (req, res, next) {
  res.send('all users');
});


module.exports = router