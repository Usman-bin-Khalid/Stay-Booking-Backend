const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name : String,
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {type: String},
    isHost : {type : Boolean, default : false},
});

module.exports = mongoose.model('User', userSchema);
