const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
    },
    userName: String,
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contacts: [
        {
            userId: String,
            userName: String,
            avatar: String,
            rememberName: String
        }
    ],
    dateCreate: {
        type: Date,
        default: Date.now
    },
    dateUpdate: {
        type: Date,
        default: Date.now
    }
})

schema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10)
            this.password = await bcrypt.hash(this.password, salt)
            this.dateUpdate = Date.now()
        } catch (err) {
            return next(err)
        }
    }
    next()
})

schema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password)
    } catch (error) {
        throw error
    }
}

const User = mongoose.model('User', schema)

module.exports = User