var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath :  {type: String},
    price :      {type: Number,required: true},
    title:       {type: String,required: true},
    description: {type: String,required: true}
    });

module.exports = schema('Medicine',schema);
