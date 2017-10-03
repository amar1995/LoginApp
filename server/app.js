const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');

//Getting the routes
const restAPI = require('./routes/restAPI');
const authenticate = require('./routes/authenticate')(passport);

//Adding middleware to express
//Adding express session middleware
app.use(session({
    secret: 'smile rhyme'
}));
//Adding passport middleware
app.use(passport.initialize());
app.use(passport.session());

const initPassport = require('./passport-init');
initPassport(passport);

//Adding the routes middleware
app.use('/api',restAPI);
app.use('/auth', authenticate);

module.exports = app;