const express = require('express')
const { searchUser } = require('../controller/search.controller')

const router = express.Router()

// GET /api/user/search?query=abc
router.get('/user/search', searchUser)

module.exports = router
