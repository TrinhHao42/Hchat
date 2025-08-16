const express = require('express')
const { accessAppend, accessRemove } = require('../controller/access.controller')

const router = express.Router()

router.use('/accessAppend', accessAppend)
router.use('/accessRemove', accessRemove)

module.exports = router