const express = require("express")
const http = require("http")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const { Server } = require("socket.io")

const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY
const CLIENT = process.env.CLIENT
const connectedUsers = new Map()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: CLIENT,
    methods: ["GET", "POST"],
    credentials: true
  }
})

io.use((socket, next) => {
  const accessToken = socket.handshake.auth.accessToken

  if (!accessToken) {
    return next(new Error("Thiếu token xác thực"))
  }

  try {
    const user = jwt.verify(accessToken, SECRET_KEY)

    if (connectedUsers.has(user.username)) {
      return next(new Error("Tài khoản đã đăng nhập ở nơi khác."))
    }

    socket.user = user
    next()
  } catch (err) {
    return next(new Error("Token không hợp lệ"))
  }
})

io.on("connection", (socket) => {
  connectedUsers.set(socket.user.username, socket.id)

  socket.emit("userConnect", {
    message: "Bạn đã kết nối thành công!",
    user: socket.user,
  })

  socket.on("disconnect", () => {
    console.log(`User ngắt kết nối: ${socket.user.username}`)
    connectedUsers.delete(socket.user.username)
  })
})


server.listen(PORT, () => {
  console.log(`Socket server đang chạy tại http://localhost:${PORT}`)
})