var passport = require('passport');
var User = require('../models/users');
var Localstrategy = require('passport-local').Strategy;

passport.serializeUser(function (user,done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    User.findById(id,function (err, user) {
       done(err,user);
    });
});

passport.use('local.signup',new Localstrategy({
    usernameField: 'email',
    passwordField: 'password',
    //roleField: 'role',
    passReqToCallback: true
},function (req,email,password,done) {
    req.checkBody('email','Invalid Email').notEmpty().isEmail();
    req.checkBody('password','Invalid Password').notEmpty().isLength({min:4});
    req.checkBody('role','Need A Role').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null,false,req.flash('error',messages));
    }

    User.findOne({'email':email},function (err, user) {

        if(err){
            return done(err);
        }

        if(user){
            return done(null,false,{message:'Email is already in use. '});
            //return done(null,false,req.flash('loginMessage', 'error'));

        }

        var newUser = new User();
        newUser.email    = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.role = req.param('role');
        newUser.save(function (err, result) {
            if(err){
                return done(err);
            }
            return done(null,newUser);
        });
    });

}));

passport.use('local.login', new Localstrategy({
    usernameField: 'email',
    passwordField: 'password',
    //role?
    passReqToCallback: true
},function (req,email,password,done) {
    req.checkBody('email','Invalid Email').notEmpty().isEmail();
    req.checkBody('password','Invalid Password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null,false,req.flash('error',messages));
    }

    User.findOne({'email':email},function (err, user) {
        if(err){
            return done(err);
        }
        if(!user){
            return done(null,false,{message:'No User Found !'});
        }
        if(!user.validPassword(password)){
            return done(null,false,{message:'Wrong Password !'});
        }
        return done(null,user);

    });


}));

