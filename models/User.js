var mongoose = require('mongoose');
var bcrypt=require('bcrypt')

var UserSchema = mongoose.Schema({
   google: {
        id:String,
        token:String,
        name:String
   },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);