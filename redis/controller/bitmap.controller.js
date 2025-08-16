const { response } = require('express')
const { redisClient } = require('../config/redisClient')
const crc32 = require('../util/crc32')

const bitmapAppend = (req, res) => {
    const { key, value } = req.body

    const hashedValue = crc32(value, 100000)


    redisClient.hSet(key, hashedValue, (err, result) => {
        if (err) {
            console.error('Error appending to Redis:', err)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
        res.json({ result })
    })

    // check is appended
    redisClient.hGet(key, hashedValue, (err, result) => {
        if (err) {
            console.error('Error checking if value is appended:', err)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
        res.status(200).json({ message: JSON.stringify(result) })
    })
}

const bitmapRemove = (req, res) => {
    const { key } = req.body
    const hashedValue = crc32(key, 100000)
    redisClient.hdel(hashedValue, (err, result) => {
        if (err) {
            console.error('Error removing from Redis:', err)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
        res.json({ result })
    })
}

module.exports = {
    bitmapAppend,
    bitmapRemove
}