const { redisClient } = require('../configs/redisClient')
const crc32 = require('../util/crc32')

const bitmapAppend = async (req, res) => {
    const { key, value, status } = req.body
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect()
        }
        const hashedValue = crc32(value)
        const previousBit = await redisClient.setBit(key, hashedValue, status)
        res.status(200).json({ result: previousBit, message: 'Bit set successfully' })
    } catch (err) {
        console.error('Error setting bit in Redis:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const bitmapGet = async (req, res) => {
    const { key, value } = req.body
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect()
        }
        const hashedValue = crc32(value)
        const result = await redisClient.getBit(key, hashedValue)
        res.status(200).json({ result, message: 'Bit retrieved successfully' })
    } catch (err) {
        console.error('Error getting bit from Redis:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const bitmapRemove = async (req, res) => {
    const { key, value } = req.body
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect()
        }
        const hashedValue = crc32(value)
        const previousBit = await redisClient.setBit(key, hashedValue, 0)
        res.status(200).json({ result: previousBit, message: 'Bit cleared successfully' })
    } catch (err) {
        console.error('Error clearing bit in Redis:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    bitmapAppend,
    bitmapGet,
    bitmapRemove
}