const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({
    U_user_name: {
        type: String,
        require: true,
        default: "UserNew"
    },
    U_password: {
        type: String,
        required: true
    },
    U_avatar: {
        type: String,
        require: true,
        default: ""
    },
    U_email: {
        type: String,
        required: true,
        unique: true
    },
    U_contacts: [
        {
            U_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            U_avatar: {
                type: String,
                default: ""
            },
            U_remember_name: {
                type: String,
                require: true
            },
            chatroom_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Chatroom'
            }
        }
    ],
    U_friend_requests: [
        {
            from: {
                U_user_name: { type: String, required: true },
                U_email: { type: String, required: true },
                U_avatar: { type: String, default: "" }
            },
            status: {
                type: String,
                enum: ['pending', 'accepted', 'rejected'],
                default: 'pending'
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    U_creator_id: {
        type: Number,
        require: true
    },
    U_modifier_id: {
        type: Number
    },
    U_deleter_id: {
        type: Number
    },
    U_create_at: {
        type: Date,
        default: Date.now
    },
    U_update_at: {
        type: Date,
        default: 0
    },
    U_delete_at: {
        type: Date,
        default: 0
    },
    U_version: {
        type: Number,
        require: true,
        default: 0.0
    }
})

schema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        this.U_password = await bcrypt.hash(this.U_password, salt)
    } catch (err) {
        return next(err)
    }

    next()
})

schema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.U_password)
}

const User = mongoose.model('User', schema)

module.exports = User