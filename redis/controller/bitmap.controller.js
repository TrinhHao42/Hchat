const { response } = require('express')
const { redisClient } = require('../config/redisClient')
const crc32 = require('../util/crc32')

const bitmapAppend = async (req, res) => {
    const { key, value } = req.body

    const hashedValue = crc32(value)


    try {
        const result = await redisClient.setBit(key, hashedValue, 1)
        res.status(200).json({message: result})
    } catch (err) {
        console.error('Error setting bit in Redis:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
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