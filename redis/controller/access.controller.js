const { redisClient } = require('../config/redisClient')

const accessAppend = (req, res) => {
    const { key, value } = req.body
    redisClient.hset(key, value, (err, result) => {
        if (err) {
            console.error('Error appending to Redis:', err)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
        res.json({ result })
    })
}

const accessRemove = (req, res) => {
    const { key } = req.body
    redisClient.hdel(key, (err, result) => {
        if (err) {
            console.error('Error removing from Redis:', err)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
        res.json({ result })
    })
}

module.exports = {
    accessAppend,
    accessRemove
}