const express = require('express');
const router = express.Router();

module.exports = function (passport) {
    
    //send successful login state back to angular
    router.get('/auth/success', function (req, res) {
        res.send({state: 'success', user: req.user ? req.user : null});
    });

    //sends failure login tate back to angular
    router.get('/auth/failure', function (req, res) {
        res.send({state: 'failure', user: null, message: "Invalid username of password"});
    });

    //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    //signup
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    //logout
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}