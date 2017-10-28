
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title:  String,
    body:   String,
    edate: { type: Date },
    pdate: { type: Date },
    publisher: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Event',schema);
