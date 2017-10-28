
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {type: String},
    phone : Number,
    message : String,
    createdAt: {type: Date, default: Date.now },
});

module.exports = mongoose.model('contact',schema);