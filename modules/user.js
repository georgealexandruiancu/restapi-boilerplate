const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create user Schema & model
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is req']
    },
    rank: {
        type: String,
        required: [true, 'Rank field is req']
    },
    available:{
        type: Boolean,
        required: [true, 'Available field is req']
    },
    avatar: {
        type: String,
    } 
});
const User = mongoose.model('user', UserSchema);

module.exports = User;