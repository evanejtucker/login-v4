const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const profile = require('./controller/routes/profile');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const Users = require('./models/Users.js');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const auth = require('./controller/passport.js');

    // handlebars
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // express middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('tiny'));
    app.use(cookieParser());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    }));
    app.use(express.static('public'));
    app.use('/profile', profile);
    app.use(passport.initialize());
    app.use(passport.session());

// mongoose
mongoose.connect('mongodb://localhost/login-v4');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("successfully connected to db");
});

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
  
// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
// });

// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//           if (err) { return console.log(err); }
//           if (!user) {
//               console.log("no user found");
//               return done(null, false, { message: 'no user found.' }); 
//           }
//           if (user) {
//               if(user.validPassword(password, user.password)) {
//                   console.log("password correct");
//                   return done(null, user);
//               } else {
//                   console.log('password incorrect');
//                   return done(null, false); 
//               }
//           }
//         });
//     }
//   ));

app.get('/', (req, res, next) =>  {
    // res.send('Hello World!')
    res.render('index' , {name: 'Evan'});
});

app.post('/login', (req, res, next) => {
    res.send(req.body);
});

app.post('/newUser', (req, res, next) => {
    res.send(req.body);
});

app.listen(port, () => {
    console.log('App listening on port ' + port);
});