const express = require('express')
const checkServiceToken = require("../middleware/auth.middleware")
const { getUserByEmailAndPassword, registerNewUser, getUserByToken } = require('../controller/user.controller')

const router = express.Router()

router.post('/getUserByEmailAndPassword', checkServiceToken, getUserByEmailAndPassword)

router.post('/registerNewUser', checkServiceToken, registerNewUser)

router.post("/getUserByToken", checkServiceToken, getUserByToken)

module.exports = router