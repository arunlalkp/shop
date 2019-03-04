var express = require('express');
var router = express.Router();
const Product = require('../models/product')

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

module.exports = router;
