
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    email:    {type:String,required:true},
    password: {type:String,required:true},
    role:     {type:String,required:true},
    firstname: String,
    lastname: String,
    phone: Number,
    age:{type:String,min:1,max:100},
    weight: Number,
    height: Number,
    blood_group: String,
    gender: {type: String, enum: ["Male", "Female",'Other']},
    country: String,
    city: String,
    phs: String,
    online: Boolean,
    imagePath :  {type: String},
    eventsAttended: [{ type: Schema.Types.ObjectId, ref: 'Event' }]

});

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password,this.password);
};

userSchema.methods.getRole = function() {
    return this.role;
};


module.exports = mongoose.model('User',userSchema);

