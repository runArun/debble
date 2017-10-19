var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');



router.use(csrf());

router.use('/',notLoggedIn ,function (req,res,next) {
    next();
});

router.get('/login',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/login',{csrfToken:req.csrfToken(),title:'health_assistant'});
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