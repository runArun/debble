var express = require('express');
var router = express.Router();




router.get('/index', function(req, res, next) {

    res.render('doctor/index');
});

router.get('/discussion', function(req, res, next) {

    res.render('discussion/discussion');
});

router.get('/addquiz', function(req, res, next) {

    res.render('doctor/addquiz');
});

router.get('/addevent', function(req, res, next) {

    res.render('doctor/addevent');
});


module.exports = router;