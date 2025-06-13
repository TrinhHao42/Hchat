const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const jwt = require("jsonwebtoken")
const cors = require("cors")
require('dotenv').config()

const app = express()
const port = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY
const connectedUsers = new Map()

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin:  process.env.CLIENT,
    methods: ["GET", "POST"],
  }
})

io.use((socket, next) => {
  const token = socket.handshake.auth.token

  if (!token) {
    return next(new Error("Thiếu token xác thực"))
  }

  try {
    const user = jwt.verify(token, SECRET_KEY)

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

  socket.on("message", (data) => {
    console.log(`📨 ${socket.user.username} gửi:`, data)
    io.emit("message", { id: socket.id, username: socket.user.username, message: data })
  })

  socket.on("disconnect", () => {
    console.log(`❌ User ngắt kết nối: ${socket.user.username}`)
    connectedUsers.delete(socket.user.username)
  })
})


server.listen(port, () => {
  console.log(`Socket server đang chạy tại http://localhost:${port}`)
})