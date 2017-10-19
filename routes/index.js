var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');


/* GET home page. */

var csrfProtection = csrf();
router.use(csrfProtection);



router.post('/login', passport.authenticate('local.signin',{
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
