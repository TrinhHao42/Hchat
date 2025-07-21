const express = require("express")
const http = require("http")
require("dotenv").config()

const { Server } = require("socket.io")
const { disconnect } = require("./controller/connection.controller")
const middleware = require("./middleware/socketMiddleware")

const PORT = process.env.PORT
const CLIENT = process.env.CLIENT
const connectedUsers = new Map()

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: CLIENT,
    methods: ["GET", "POST"],
    credentials: true,
  }
})

io.use((socket, next) => {
  middleware(socket, next, connectedUsers)
})

io.on("connection", (socket) => {
  connectedUsers.set(socket.user, socket.id)
  console.log(`User kết nối: ${socket.user}`)

  socket.emit("userConnect")

  socket.on("disconnect", () => disconnect(socket, connectedUsers))
})

server.listen(PORT, () => {
  console.log(`Socket server đang chạy tại http://localhost:${PORT}`)
})