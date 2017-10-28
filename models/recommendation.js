
var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    recommendation: [String]

});

module.exports = mongoose.model('Recommendation',schema);