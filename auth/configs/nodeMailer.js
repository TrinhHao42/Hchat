const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nguoila10112004@gmail.com',
        pass: 'dpyt jmaw qwte ftnv'
    }
})

module.exports = transporter