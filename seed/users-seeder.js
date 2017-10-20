var User = require('../models/users');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/health_assistant');

var users = [

    new User({
        email:'zl2613185@qq.com',
        password:'zl995311562',
        role:'customer'
    }),

    new User({
        email:'',
        password:'',
        role:''
    }),

    new User({
        email:'',
        password:'',
        role:''
    })
];

var done = 0;
for (var i = 0; i < users.length; i++){
    users[i].save(function (err, result) {
        done++;
        if(done === users.length){
            exit();
            //for all users can be saved
        }
    });
}
function exit() {
    mongoose.disconnect();
}