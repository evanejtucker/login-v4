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

app.get('/', (req, res, next) =>  {
    // res.send('Hello World!')
    res.render('index' , {name: 'Evan'});
});

app.get('/failure', (req, res, next) =>  {
    res.send('not authenticated');
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/profile',
                                   failureRedirect: '/failure'})
);

app.post('/newUser', (req, res, next) => {
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
            console.log(newUser);
            newUser.save((error)=> {
                if (error) return console.log(error);
                console.log('user saved successfully');
            });
        }
    });
    res.redirect('/');
});

app.use('/profile', auth.checkAuthentication, profile);

app.listen(port, () => {
    console.log('App listening on port ' + port);
});