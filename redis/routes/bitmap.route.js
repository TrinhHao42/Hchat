const express = require('express')
const { bitmapAppend, bitmapRemove } = require('../controller/bitmap.controller')

const router = express.Router()


router.post('/bitmapAppend', bitmapAppend)
router.use('/bitmapRemove', bitmapRemove)

module.exports = router