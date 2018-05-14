var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

var user = require('../models/users.js');
var acc = require('../models/accesscode');

router.get('/login',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/login',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length > 0});
});

router.post('/login', passport.authenticate('local.login',{
    failureRedirect: '/user/login',
    failureFlash: true
}),function (req, res, next) {
    user.find({email:req.body.email},{'role':1},function (err,docs) {

        if(err){
            res.redirect('/user/login');
        }


                if (docs[0].role==='doctor') {

                    res.redirect('/doctor/index');

                } else if (docs[0].role==='customer') {

                    acc.findOne({'ac':req.body.ac},function (err, accode) {

                        if (err) {
                            return done(err);
                        }
                        if (accode) {
                            res.redirect('/customer/index');
                        } else {
                            res.redirect('/user/login');
                        }
                    });

                } else if (docs[0].role==='technical') {

                    res.render('technical/index');
                } else {
                    res.redirect('/user/login');

                }


    });
});



router.get('/signup',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/signup',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/user/login',
    failureRedirect: '/user/signup',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(req.session.oldUrl);
    } else {
        res.redirect('/user/login');
    }
});


router.get('/logout', isLoggedIn, function (req,res,next) {
    req.logout();
    res.redirect('/user/login');
});






module.exports = router;



function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/user/login');
}
function notLoggedIn(req,res,next) {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/user/login');
}