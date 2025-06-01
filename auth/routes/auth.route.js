const express = require('express')
const jwt = require("jsonwebtoken")
const axios = require("axios")
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
    const { data: user } = await axios.post(DATA_SERVER + '/api/user/get', {
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

    res.json({redirectTo: '/user/chatroom', token, socketServer: SOCKET_SERVER, user})
  } catch (err) {
    console.error("Lỗi auth server:", err.message)
    res.status(400).json({ message: err.message || "Đăng nhập thất bại" })
  }
})

module.exports = router