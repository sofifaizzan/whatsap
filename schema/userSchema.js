const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
        min : [6, "password is too short"]
    },
    friends : {
        type : Array,
        value : [],
    },
    friendReq : {
        type : Array,
        value : [],
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;