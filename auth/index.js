const express = require("express")
const cors = require("cors")
const router = require('./routes/auth.route')
require('dotenv')

const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(cors())
app.use('/auth', router)

app.listen(port, () => {
  console.log(`Auth server đang chạy tại http://localhost:${port}`)
})