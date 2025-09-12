const express = require('express')
const { accessAppend, accessRemove, accessGet} = require('../controller/access.controller')

const router = express.Router()

router.post('/accessAppend', accessAppend)
router.delete('/accessRemove', accessRemove)
router.post('/accessGet', accessGet)

module.exports = router