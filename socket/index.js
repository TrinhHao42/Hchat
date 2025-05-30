const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = 3002;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    console.error("Thiếu token xác thực");
    return next(new Error("Thiếu token xác thực"));
  }

  try {
    const user = jwt.verify(token, SECRET_KEY);
    socket.user = user;
    console.log("Xác thực token thành công:", user);
    next();
  } catch (err) {
    console.error("Lỗi xác thực token:", err.message);
    return next(new Error("Token không hợp lệ"));
  }
});

io.on("connection", (socket) => {
  console.log(`✅ User kết nối: ${socket.user.username} (socket id: ${socket.id})`);

  socket.emit("userConnect", {
    message: "Bạn đã kết nối thành công!",
    user: socket.user,
  });

  socket.on("message", (data) => {
    console.log(`📨 ${socket.user.username} gửi:`, data);
    io.emit("message", { id: socket.id, username: socket.user.username, message: data });
  });

  socket.on("disconnect", () => {
    console.log(`❌ User ngắt kết nối: ${socket.user.username}`);
  });
});

server.listen(port, () => {
  console.log(`Socket server đang chạy tại http://localhost:${port}`);
});