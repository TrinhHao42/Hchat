const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    messageId: {
        type: String,
        required: true,
        unique: true
    },
    chatroomId: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    messages: {
        message: String,
        timeCreate: {
            type: Date,
            default: Date.now
        },
        userId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['sent', 'delivered', 'read'],
            default: 'sent'
        }
    }
})

const Message = mongoose.model('Message', schema);

module.exports = Message