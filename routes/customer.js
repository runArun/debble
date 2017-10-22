var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');
var Medicine = require('../models/medicine.js')

/* GET home page. */

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/index', function(req, res, next) {
    var successMsg = req.flash('success')[0];

    Medicine.find(function (err,docs) {

        var productChunks = [];
        var chunkSize = 3;

        for (var i = 0; i< docs.length; i += chunkSize){
            productChunks.push(docs.slice(i,i + chunkSize));
        }
        console.log(productChunks);
        res.render('customer/index', { medicines: productChunks,successMsg: successMsg, noMessages :!successMsg});
    });

});

router.get('/profile', function(req, res, next) {

    res.render('customer/profile');
});

router.get('/quiz', function(req, res, next) {

    res.render('customer/quiz');
});

router.get('/map', function(req, res, next) {

    res.render('customer/map');
});



router.get('/shopping-cart',function (req, res, next) {
    if (!req.session.cart){
        return res.render('shop/shopping-cart',{products:null});
    }

    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart',{products: cart.generateArray(), totalPrice: cart.totalPrice});
});

module.exports = router;
