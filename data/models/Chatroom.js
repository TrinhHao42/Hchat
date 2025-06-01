const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    chatroomId: {
        type: String,
        required: true,
        unique: true
    },
    chatroomName: String,
    type: {
        type: String,
        required: true,
        enum: ['private', 'group'],
        default: 'private'
    },
    avatar: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: true
    },
    members: {
        userId: String,
        role: {
            type: String,
            required: true
        }
    },
    dateCreate: {
        type: Date,
        default: Date.now
    },
    dateUpdate: {
        type: Date,
        default: Date.now
    }
})

const Chatroom = mongoose.model('Chatroom', schema);

module.exports = Chatroom