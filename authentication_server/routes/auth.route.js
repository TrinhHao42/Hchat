const express = require('express')
const jwt = require("jsonwebtoken")
const axios = require("axios")
const crypto = require('crypto')
const { v4 } = require('uuid')
const nodemailer = require('../configs/nodeMailer')
const redisClient = require('../configs/redisClient')
const transporter = require('../configs/nodeMailer')
const { mailOptions } = require('../configs/mailOption')
const { error } = require('console')
const { decode } = require('punycode')
const { json } = require('stream/consumers')

require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY
const API_GATEWAY = process.env.API_GATEWAY
const DATA_SERVER = process.env.DATA_SERVER

const router = express.Router()

router.post("/login", async (req, res) => {
  const { userName, password } = req.body

  try {
    const { data: user } = await axios.post(`${DATA_SERVER}/user/get`,
      {
        userName,
        password
      },
      {
        headers: {
          'x-service-token': process.env.INTERNAL_SERVICE_TOKEN
        }
      })

    const accessToken = jwt.sign(
      { user },
      SECRET_KEY,
      { expiresIn: "5s" }
    )

    const refreshToken = jwt.sign(
      { id: user.id },
      SECRET_KEY,
      { expiresIn: "7d" }
    )

    res.status(200).json({ accessToken, refreshToken, user })
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Đăng nhập thất bại"
    res.status(400).json({ message })
  }
})

router.post("/register", async (req, res) => {
  const { email, name, password } = req.body

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

    const { data: newUser } = await axios.post(`${DATA_SERVER}/user/register`,
      { user: userData },
      {
        headers: {
          'x-service-token': process.env.INTERNAL_SERVICE_TOKEN
        }
      }
    )

    if (!newUser) {
      return res.status(500).json({ message: 'Không thể tạo tài khoản, vui lòng thử lại' })
    }

    await redisClient.del(`verify:${token}`)

    return res.status(200).json({ message: 'Xác thực thành công, bạn có thể đăng nhập' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.get('/checkLogin', (req, res) => {
  const accessToken = req.headers['authorization']

  if (!accessToken)
    return res.status(401).json({ message: 'Thiếu token xác thực' })


  jwt.verify(accessToken, SECRET_KEY, (error, decoded) => {
    if (error)
      if (error.name === 'TokenExpiredError')
        return res.status(401).json({ message: 'Token hết hạn' })
      else
        return res.status(401).json({ message: 'Sai token' })

    res.status(200).json(decoded)
  })
})

router.get('/refreshAccessToken', (req, res) => {
  const refreshToken = req.headers['authorization']

})

module.exports = router