var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');

var Medicine = require('../models/medicine.js');
var Cart =  require('../models/cart');
var Order = require('../models/order');
var contact =require('../models/contact.js');
var user = require('../models/users.js');
var event = require('../models/event');
/* GET customer pages. */

//var csrfProtection = csrf();
//router.use(csrfProtection);

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

router.get('/recording', function(req, res, next) {

    res.render('customer/recording');
});

router.get('/profile', isLoggedIn,function (req,res,next) {
    Order.find({user: req.user}, function (err, orders) {
        if (err){
            return res.write('Error !');
        }
        var cart;
        orders.forEach(function (order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('customer/recording',{orders: orders});
    }); //mongoose can find id
});

router.get('/info', function(req, res, next) {

    res.render('customer/info');
});

router.post('/info', function(req, res, next) {
    var conditions = {
        _id: req.user._id
    };

    var update = {
        $set: {
            firstname:      req.body.fn,
            lastname:       req.body.ln,
            phone:          req.body.phone,
            age:            req.body.age,
            weight:         req.body.w,
            height:         req.body.h,
            blood_group:    req.body.bg,
            gender :        req.body.gender,
            country:        req.body.country,
            city:           req.body.city,
            phs:            req.body.phs
        }
    };

    user.update(conditions, update, function(error){
        if(error) {
            console.log(error);
        } else {
            console.log('Update success!');
        }
    });

    res.render('customer/info');
});


router.get('/contact', function(req, res, next) {

    res.render('customer/contact');
});

router.post('/contact', function(req, res, next) {

    var newContact = new contact({
        name:  req.body.name,
        phone:   req.body.phone,
        message: req.body.message

    });
    console.log('1');
    newContact.save(function (err) {
        if(!err){
            console.log('2');

            req.flash('msg','successfully added !');
            res.render('customer/contact',{ messages: req.flash('msg') });
        };
    });

});

router.get('/emergency', function(req, res, next) {
    res.render('customer/index');
});

router.get('/discussion', function(req, res, next) {

    res.render('discussion/discussion');
});

router.get('/quiz', function(req, res, next) {

    res.render('customer/quiz');
});

router.get('/availabledoctors', function(req, res, next) {

    user.find({"online": true},function (err,docs) {

        var productChunks = [];
        var chunkSize = 3;

        for (var i = 0; i< docs.length; i += chunkSize){
            productChunks.push(docs.slice(i,i + chunkSize));
        }
        //console.log(productChunks);
        res.render('customer/a_doctors', { doctors: productChunks});
    });

});


router.get('/map', function(req, res, next) {

    res.render('customer/map');
});



router.get('/showevent', function(req, res, next) {
    event.find(function (err,docs) {

        if(err){res.render('customer/index')};
        console.log(docs);
        res.render('customer/showevent', { events:docs});
    });

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



router.get('/checkout', isLoggedIn, function (req, res, next) {
    if (!req.session.cart){
        return res.redirect('/customer/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('customer/checkout',{total:cart.totalPrice, errMsg: errMsg, noError:!errMsg});
});

router.post('/checkout', isLoggedIn, function (req, res, next) {

    if (!req.session.cart){
        return res.redirect('/customer/shopping-cart');
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
        "sk_test_2lepNuJln0Eme2UcwR938izq"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "aud",
        // source: req.body.stripeToken, // obtained with Stripe.js
        //上面这句话仍旧是正确的 只是因为版本过时没有正确产生token
        source: "tok_visa",
        description: "Charge for test"
    }, function(err, charge) {
        // asynchronously called
        if(err) {
            req.flash('error',err.message);
            return res.redirect('/customer/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function (err, result) {
            if (err){}
            req.flash('success','Successfully bought product!');
            req.cart = null;
            res.redirect('/customer/index');
        });

    });
});







module.exports = router;


function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/login');
}