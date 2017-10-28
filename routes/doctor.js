var express = require('express');
var router = express.Router();

var quiz = require('../models/quizs.js');
var event = require('../models/event');


router.get('/index', function(req, res, next) {

    res.render('doctor/index');
});

router.get('/discussion', function(req, res, next) {

    res.render('discussion/discussion');
});

router.get('/info', function(req, res, next) {

    res.render('doctor/info');
});

router.get('/addquiz', function(req, res, next) {

    res.render('doctor/addquiz');
});

router.post('/addquiz', function(req, res, next) {

    var newQuiz = new quiz({
        questions : req.body.qst,
        a1:req.body.a1,
        a2:req.body.a2,
        a3:req.body.a3,
        a4:req.body.a4,
        correctAnswer : req.body.ca
    });
    newQuiz.save(function (err) {
        if(!err){

            req.flash('msg','successfully added !');
            res.render('doctor/addquiz',{ messages: req.flash('msg') });
        }
    });

});

router.get('/addevent', function(req, res, next) {

    res.render('doctor/addevent');
});


router.post('/addevent', function(req, res, next) {

    var newEvent = new event({
        title:  req.body.et,
        body:   req.body.ct,
        date: { type: Date },

        correctAnswer : req.body.ca
    });
    newQuiz.save(function (err) {
        if(!err){

            req.flash('msg','successfully added !');
            res.render('doctor/addquiz',{ messages: req.flash('msg') });
        }
    });

});



module.exports = router;