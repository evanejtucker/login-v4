const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
var profile = require('./controller/routes/profile')

    // express middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('tiny'));
    app.use(cookieParser());
    app.use(express.static('public'));
    app.use('/profile', profile)


app.get('/', (req, res, next) =>  {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log('App listening on port ' + port);
});