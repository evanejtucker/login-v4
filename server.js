const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
var profile = require('./controller/routes/profile');
var exphbs  = require('express-handlebars');

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


app.get('/', (req, res, next) =>  {
    // res.send('Hello World!')
    res.render('index' , {name: 'Evan'});
});

app.listen(port, () => {
    console.log('App listening on port ' + port);
});