var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    questions : {type: String, required : true},
    Author : String,
    creatTime : Date
});
