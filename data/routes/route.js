const express = require('express')
const User = require('../models/user')

const app = express.Router()

app.post("/user", (req, res) => {
  const { userName } = req.body

  const user = users.find(
    (user) => user.userName.toLowerCase() === userName.toLowerCase()
  )

  if (!user) {
    console.log("Không tìm thấy user:", userName)
    return res.status(400).json({ message: "Không tìm thấy người dùng" })
  }

  res.status(200).json(user)
})

module.exports = app