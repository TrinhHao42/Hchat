const redis = require('redis')

const redisClient = redis.createClient({
  username: 'default',
  password: 'ao4hrs4UxDHjbw0WwP4nzwjsYmDlTArx',
  socket: {
    host: 'redis-19301.c8.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 19301,
  },
})

redisClient.on('error', (err) => console.log('Redis Client Error', err))

async function connectRedis() {
    try {
        await redisClient.connect()
        console.log('Connected to Redis')
        return redisClient
    } catch (err) {
        console.error('Failed to connect to Redis:', err)
        throw err
    }
}

module.exports = { redisClient, connectRedis }
