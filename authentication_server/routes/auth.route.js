const express = require('express')
require('dotenv').config()

const {
  login,
  register,
  verificationRegisterToken,
  checkAccessToken,
  refreshAccessToken,
  logout
} = require('../controller/auth.controller')

const router = express.Router()

router.post("/login", login)

router.post("/register", register)

router.get('/verify/:token', verificationRegisterToken)

router.get("/checkAccessToken", checkAccessToken)

router.get("/refreshAccessToken", refreshAccessToken)

router.post("/logout", logout)

module.exports = router