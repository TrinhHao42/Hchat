const express = require('express')
const checkServiceToken = require("../middleware/auth.middleware")
const { getUserByUserNameAndPassword, registerNewUser, getUserByToken } = require('../controller/user.controller')

const router = express.Router()

router.post('/getUserByUserNameAndPassword', checkServiceToken, getUserByUserNameAndPassword)

router.post('/registerNewUser', checkServiceToken, registerNewUser)

router.post("/getUserByToken", checkServiceToken, getUserByToken)

module.exports = router