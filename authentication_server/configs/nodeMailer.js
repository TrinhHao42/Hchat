const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nguoila10112004@gmail.com',
        pass: 'vgzr iyco geus ollx'
    }
})

module.exports = transporter