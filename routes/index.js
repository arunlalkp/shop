var express = require('express');
var router = express.Router();
const Product = require('../models/product');
const csrf = require('csurf');
const passport = require('passport');

const csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {

  Product.find(function (err, docs) {
    let productChunks = [];
    let chunkSize = 4;
    for (let i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
  })
});

router.get('/user/signup', function (req, res, next) {
  res.render('user/signup',{csrfToken: req.csrfToken()})
});

router.post('/user/signup',passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: 'user/signup',
  failureFlash: true
}));

router.get('/user/profile', function (req, res, next) {
  res.render('user/profile');
});

module.exports = router;
