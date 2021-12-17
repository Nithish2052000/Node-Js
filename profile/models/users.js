const mongoose = require('mongoose');
const { json } = require('body-parser');
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    todo1 : {
        type: JSON
    },
    todo2 : {
        type: JSON
    },
    date:{
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('User', UserSchema);
