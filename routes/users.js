var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');



router.use(csrf());


router.use('/',notLoggedIn ,function (req,res,next) {
    next();
});


router.get('/',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/login',{csrfToken:req.csrfToken(),title:'health_assistant'});
});


router.post('/', passport.authenticate('local.login',{
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
module.exports = router;



function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
function notLoggedIn(req,res,next) {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}