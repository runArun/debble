var express = require('express');
var router = express.Router();

var acc = require('../models/accesscode');


router.get('/index', function(req, res, next) {

    res.render('technical/index');
});


router.get('/accesscode', function(req, res, next) {

    res.render('technical/accesscode');
});

router.post('/accesscode', function(req, res, next) {

    var newAc = new acc({
        ac  : req.body.ac,
    });
    newAc.save(function (err) {
        if(!err){

            req.flash('msg','successfully added !');
            res.render('technical/accesscode',{ messages: req.flash('msg') });
        }
        if(err){

            res.render('technical/index');
        }
    });
});




router.get('/discussion', function(req, res, next) {

    res.render('discussion/discussion');
});




module.exports = router;
