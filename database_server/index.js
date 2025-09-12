const express = require("express");
const cors = require("cors");
const user = require('./routes/user.route')
const access = require('./routes/access.route')
const bitmap = require('./routes/bitmap.route')
require('./configs/connectDB')
require('dotenv').config()
const connectRedis = require('./configs/redisClient').connectRedis


const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

connectRedis()
.then(console.log("connect redis success"))
.catch(console.error);

app.use('/user', user)
app.use('/access', access)
app.use('/bitmap', bitmap)

app.listen(port, () => {
  console.log(`Data server đang chạy tại http://localhost:${port}`);
});