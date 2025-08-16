const express = require('express')
const bitmap = require('./routes/bitmap.route')
const access = require('./routes/access.route')
const { connectRedis } = require('./config/redisClient')

const app = express()

app.use(express.json())
connectRedis()

app.use('/bitmap', bitmap)
app.use('/access', access)


app.listen(5000, () => {
    console.log('Server is running on port 5000')
})