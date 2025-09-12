const express = require('express')
const { bitmapAppend, bitmapRemove, bitmapGet} = require('../controller/bitmap.controller')

const router = express.Router()

router.post('/bitmapAppend', bitmapAppend)
router.delete('/bitmapRemove', bitmapRemove)
router.post('/bitmapGet', bitmapGet)

module.exports = router