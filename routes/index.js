var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');


/* GET home page. */

var csrfProtection = csrf();
router.use(csrfProtection);





module.exports = router;
