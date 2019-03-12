
var express = require('express');
var router = express.Router();
const csrf = require('csurf');
const Product = require('../models/product');

const passport = require('passport');
const mongoose = require('mongoose');

const Order = require('../models/order');
const Cart = require('../models/cart');

const csrfProtection = csrf();
router.use(csrfProtection);


router.get('/profile', isLoggedIn, function (req, res, next) {
    console.log('User Details = ' +req.user);
    Order.find({user: req.user._id}, (err, orders) => {
        console.log('error is = ' + err);
        //console.log(orders);
        if (err) {
            return res.write('Error !')
        }
        res.render('user/profile', {orders : orders});
    });


});

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});


router.use('/', notLoggedIn, function (req, res, next) {
    next();
});


router.get('/signup', function (req, res, next) {
    const messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile')
    }
});

router.get('/signin', function (req, res, next) {
    const messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile')
    }
});


module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}


function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}