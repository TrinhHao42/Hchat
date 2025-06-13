const express = require('express')
const jwt = require("jsonwebtoken")
const axios = require("axios")
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const nodemailer = require('../configs/nodeMailer')
const redisClient = require('../configs/redisClient')
const transporter = require('../configs/nodeMailer')
const { mailOptions } = require('../configs/mailOption')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY
const DATA_SERVER = process.env.DATA_SERVER
const SOCKET_SERVER = process.env.SOCKET_SERVER

const router = express.Router()

router.post("/login", async (req, res) => {
  const { userName, password } = req.body

  if (!userName || !password) {
    return res.status(400).json({ message: "Thiếu tên đăng nhập hoặc mật khẩu" })
  }

  try {
    const { data: user } = await axios.post(`${DATA_SERVER}/api/user/get`, {
      userName,
      password
    })

    if (!user) {
      return res.status(400).json({ message: "Không tìm thấy người dùng" })
    }

    const token = jwt.sign(
      { id: user.id, username: user.userName },
      SECRET_KEY,
      { expiresIn: "1h" }
    )

    res.json({ redirectTo: '/user/chatroom', token, socketServer: SOCKET_SERVER, user })
  } catch (err) {
    console.error("Lỗi auth server:", err.message)
    res.status(400).json({ message: err.message || "Đăng nhập thất bại" })
  }
})

router.post("/register", async (req, res) => {
  const { email, name, password } = req.body

  if (!email || !name || !password) {
    return res.status(400).json({ message: 'Thiếu thông tin bắt buộc (email, name, password)' })
  }

  try {
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const userData = { email, userName: name, password }
    await redisClient.set(`verify:${verificationToken}`, JSON.stringify(userData), {
      EX: 60, 
    });

    const mailConfig = mailOptions(email, verificationToken)
    await transporter.sendMail(mailConfig)

    res.status(200).json({ message: 'Email xác thực đã được gửi' })
  }
  catch (err) {
    console.error('Lỗi khi gửi email xác thực:', err)
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' })
  }
})

router.get('/verify/:token', async (req, res) => {
  const { token } = req.params

  try {
    const userDataString = await redisClient.get(`verify:${token}`)
    if (!userDataString) {
      return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' })
    }

    const userData = JSON.parse(userDataString)
    const { email, userName, hashedPassword } = userData

    const {data: newUser} = await axios.post(`${DATA_SERVER}/api/user/register`, {user: userData})

    if (!newUser) {
      return res.status(500).json({ message: 'Không thể tạo tài khoản, vui lòng thử lại' })
    }

    await redisClient.del(`verify:${token}`)

    res.status(200).json({ message: 'Xác thực thành công, bạn có thể đăng nhập' })
  } catch (err) {
    console.error('Lỗi khi xác thực tài khoản:', err)
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' })
  }
})

module.exports = router