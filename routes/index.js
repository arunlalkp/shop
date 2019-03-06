var express = require('express');
var router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {

    var successMsg = req.flash('success')[0];

    Product.find(function (err, docs) {
        let productChunks = [];
        let chunkSize = 4;
        for (let i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', { title: 'Shopping Cart', products: productChunks, successMsg: successMsg, noMessages: !successMsg });
    })
});

router.get('/add-to-cart/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if (err) {
            res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log( req.session.cart);
        res.redirect('/');
    })
});

router.get('/shopping-cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart',{products: cart.generateArray(),totalPrice: cart.totalPrice});
});

router.get('/checkout',function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg})
});

router.post('/checkout',function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart')
    }
    var cart = new Cart(req.session.cart);
    var stripe = require('stripe')("sk_test_Z90h81Hmi4TuCqK89Za7Txd7");

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken,
        description: "test charge"
    }, function (err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
    }
        req.flash('success','Successfully brought product');
        req.session.cart = null;
        res.redirect('/');
    })

});

module.exports = router;
