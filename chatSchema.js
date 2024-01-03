const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    from : {
        type : String,
        required : [true, "please enter sender name"],
        // min:[1,"from dd is empty"]
    },
    to : {
        type : String,
        required : [true, "please enter receiver name"]
    },
    msg : {
        type :String,
        min : [1,"message is empty"]
    },
    date : {
        type : Date
    }
});

const Chat = mongoose.model("Chat", ChatSchema);

// const Chat1 = new Chat({from : "faizan", to : "saba", msg : "first test text message"});

module.exports = Chat;
