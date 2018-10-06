// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/palbum');

// create a schema
var userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    location: { type: String, minlength: 5, maxlength: 15 },
    meta: {
        age: { type: Number, min: 5 },
        website: String
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

//instance method
userSchema.methods.dudify = function () {
    this.name = this.name + '- dude';
    return this.name;
};

userSchema.statics.findByLocation = function(place, cb) {
    return this.find({ location: new RegExp(place, 'i') }, cb);
};

// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = {
   "User": User,
   "UserSchema":userSchema
}