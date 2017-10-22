
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title:  String,
    body:   String,
    date: { type: Date },

});

module.exports = mongoose.model('Event',schema);
