
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var schema = new mongoose.Schema({
    questions : {type: String, required : true},
    Author : String,
    creatTime : Date
});
