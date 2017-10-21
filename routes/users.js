var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);



router.get('/login',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/login',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length > 0});
});
router.post('/login', passport.authenticate('local.login',{
    failureRedirect: '/user/login',
    failureFlash: true
}),function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(req.session.oldUrl);// req操作放在res前
    } else {
        res.redirect('/user/profile');
    }
});



router.get('/signup',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/signup',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(req.session.oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});


router.get('/profile', isLoggedIn,function (req,res,next) {

        res.render('user/profile');

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