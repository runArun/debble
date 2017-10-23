var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');

var Medicine = require('../models/medicine.js')
var Cart =  require('../models/cart');
var Order = require('../models/order');

/* GET home page. */

var csrfProtection = csrf();
router.use(csrfProtection);

router.use('/',function (req,res,next) {
    req.session.cart = new Cart(req.session.cart ? req.session.cart : {});
    next();
});

router.get('/index', function(req, res, next) {
    var successMsg = req.flash('success')[0];

    Medicine.find(function (err,docs) {

        var productChunks = [];
        var chunkSize = 3;

        for (var i = 0; i< docs.length; i += chunkSize){
            productChunks.push(docs.slice(i,i + chunkSize));
        }
        //console.log(productChunks);
        res.render('customer/index', { medicines: productChunks,successMsg: successMsg, noMessages :!successMsg});
    });

});

router.get('/profile', function(req, res, next) {

    res.render('customer/profile');
});

router.get('/info', function(req, res, next) {

    res.render('customer/info');
});

router.get('/quiz', function(req, res, next) {

    res.render('customer/quiz');
});

router.get('/map', function(req, res, next) {

    res.render('customer/map');
});



router.get('/shopping-cart',function (req, res, next) {
    console.log(req.session);
    if (!req.session.cart){
        return res.render('customer/shopping-cart',{products:null});
    }

    var cart = new Cart(req.session.cart);
    res.render('customer/shopping-cart',{products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/add-to-cart/:id',function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Medicine.findById( productId, function (err, medicine) {
        if (err) {
            return res.redirect('/user/login');
        }

        cart.add(medicine, medicine.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/customer/index');

    });

});

router.get('/reduce/:id',function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/customer/shopping-cart');
});

router.get('/remove/:id',function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/customer/shopping-cart');
});




module.exports = router;
