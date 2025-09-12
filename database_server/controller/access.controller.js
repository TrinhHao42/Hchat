const { redisClient } = require('../configs/redisClient')

const accessAppend = async (req, res) => {
    const { key, value, ttl } = req.body
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect()
        }
        await redisClient.setEx(key, ttl, value)
        res.json({ message: 'Key set successfully with TTL' })
    } catch (err) {
        console.error('Error appending to Redis with SETEX:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const accessGet = async (req, res) => {
    const { key } = req.body
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect()
        }
        const result = await redisClient.get(key)
        if (result === null) {
            return res.status(404).json({ error: 'Key not found' })
        }
        res.json({ result })
    } catch (err) {
        console.error('Error getting from Redis:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const accessRemove = async (req, res) => {
    const { key } = req.body
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect()
        }
        const result = await redisClient.del(key)
        if (result === 0) {
            return res.status(404).json({ error: 'Key not found' })
        }
        res.json({ message: 'Key deleted successfully', deletedCount: result })
    } catch (err) {
        console.error('Error removing from Redis:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    accessAppend,
    accessGet,
    accessRemove
}