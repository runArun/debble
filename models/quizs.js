
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    questions : {type: String, required : true},
    a1 : String,
    a2 : String,
    a3 : String,
    a4 : String,
    correctAnswer : {type: Number,required: true},
    createdAt: {type: Date, default: Date.now },
});

module.exports = mongoose.model('quiz',schema);