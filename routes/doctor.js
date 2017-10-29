var express = require('express');
var router = express.Router();

var quiz = require('../models/quizs.js');
var event = require('../models/event.js');
var user = require('../models/users.js');

/* GET doctor pages. */



router.get('/index', function(req, res, next) {
//
    user.find({"role":'customer',"phs":{$ne:null}},{firstname: 1,
        lastname: 1, phone:1, phs:1},function (err,docs) {

        var productChunks = [];
        var chunkSize = 3;

        for (var i = 0; i< docs.length; i += chunkSize){
            productChunks.push(docs.slice(i,i + chunkSize));
        }
        //console.log(productChunks);
        res.render('doctor/index', { customers: productChunks});
    });

});


router.post('/online', function(req, res, next) {

    var conditions = {
        _id: req.user._id
    };

    var update = {
        $set: {
            online : req.body.online
        }
    };

    user.update(conditions, update, function(error){
        if(error) {
            console.log(error);
        } else {
            console.log('Update success!');
        }
    });

    res.render('doctor/index');

});

router.get('/info', function(req, res, next) {

    res.render('doctor/info');
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

    res.render('doctor/info');
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
        ed:   req.body.ed,
        publisher : req.user
    });
    newEvent.save(function (err) {
        if(!err){

            req.flash('msg','successfully added !');
            res.render('doctor/addevent',{ messages: req.flash('msg') });
        }
    });

});



module.exports = router;