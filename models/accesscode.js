
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    ac  : {type: String, required: true},
});

module.exports = mongoose.model('accesscode',schema);