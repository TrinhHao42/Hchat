const express = require('express')
const cookieParser = require('cookie-parser') 
require('dotenv').config()

const { createProxyMiddleware } = require('http-proxy-middleware')
const { checkAPIToken } = require("./middleware/auth.middleware")

const PORT = process.env.PORT
const DATA_SERVER = process.env.DATA_SERVER
const SOCKET_SERVER = process.env.SOCKET_SERVER
const AUTH_SERVER = process.env.AUTH_SERVER

const app = express()
app.use(cookieParser())

app.use("/auth", createProxyMiddleware({
  target: AUTH_SERVER,
  changeOrigin: true
}))

app.use('/socket', createProxyMiddleware({
  target: SOCKET_SERVER,
  changeOrigin: true,
  ws: true
}))

app.use("/data/api", checkAPIToken, createProxyMiddleware({
  target: DATA_SERVER,
  changeOrigin: true
}))

app.listen(PORT, () => {
  console.log(`API Gateway is running on port: http://localhost:${PORT}`)
})