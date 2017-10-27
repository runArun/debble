
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    questions : {type: String, required : true},
    answers : [String],
    correctAnswer : {type: Number,required: true}
});

module.exports = mongoose.model('quiz',schema);