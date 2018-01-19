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

    // handlebars
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // express middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('tiny'));
    app.use(cookieParser());
    app.use(express.static('public'));
    app.use('/profile', profile)

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

app.post('/login', (req, res, next) => {
    res.send(req.body);
});

app.post('/newUser', (req, res, next) => {
    res.send(req.body);
});

app.listen(port, () => {
    console.log('App listening on port ' + port);
});