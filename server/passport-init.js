const LocalStrategy = require('passport-local');
const bCryptJS = require('bcryptjs');

//Temporary data
let users = {};

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        console.log('serializing user: '+user.username);
        return done(null, user.username);
    });

    passport.deserializeUser(function (username, done) {
        return done(null,users[username]);
    });

    passport.use('login', new LocalStrategy({passReqToCallback: true}, function (req, username, password, done) {
        //check for user's existence
        if(!users[username]) {
            return done ('Username not found', false);
        }
        //check is pasword matches the given user
        if(!isValidPassword(users[username], pasword)) {
            return done ('Password didnot match', false);
        }
        //Both the username and password match
        console.log(users[username]+' sucessfully signed in.');
        return done(null, users[username]);
    }));


    passport.use('signup', new LocalStrategy({passReqToCallback: true}, function (req, username, password, done) {
        console.log('signup got here');
        //check if the user already exists
        if(users[username]) {
            return done('Username already taken', false);
        }
        //Add user to database
        users[username] = {
            username: username,
            password: generateHashedPassword(password)
        }
        return done(null, users[username]);
    }));

    let generateHashedPassword = function (password) {
        return bCryptJS.hash(password, 9, (err, hash) => hash)
    };

    let isValidPassword = function (user, pasword) {
        return bCryptJS.compare(password, users[password], (err, res) => res);
    }
}