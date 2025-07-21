const express = require("express")
const cors = require("cors")
const router = require('./routes/auth.route')
const cookieParse = require('cookie-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
))
app.use(cookieParse())

app.use(router)

app.listen(port, () => {
  console.log(`Auth server đang chạy tại http://localhost:${port}`)
})