
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title:  String,
    body:   String,
    ed: { type: Date },
    createdAt: {type: Date, default: Date.now },
    publisher: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Event',schema);
