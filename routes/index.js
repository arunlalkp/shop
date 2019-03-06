var express = require('express');
var router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');

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

module.exports = router;
