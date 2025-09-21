const express = require("express")
const http = require("http")
require("dotenv").config()

const { Server } = require("socket.io")
const { login, logout } = require("./controller/connection.controller")

const PORT = process.env.PORT
const CLIENT = process.env.CLIENT

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: CLIENT,
    methods: ["GET", "POST"],
    credentials: true,
  }
})

io.on("connection", (socket) => {
  const user = socket.handshake.auth.user;
  
  if (!user || !user.U_email) {
    console.error("Socket connection rejected: Invalid user data", { user });
    socket.emit("connect_error", new Error("Invalid user authentication"));
    socket.disconnect();
    return;
  }
  
  socket.user = user;
  console.log(`Socket connection attempt from: ${user.U_email}`);
  
  login(socket.user.U_email)
    .then(() => {
      console.log(`✅ Socket connected successfully: ${socket.user.U_email}`);
      socket.emit("userConnect");
      socket.emit("bitmapUpdated", { 
        status: "success", 
        message: "Đã cập nhật trạng thái online",
        email: socket.user.U_email 
      });
    })
    .catch((error) => {
      console.error(`❌ Failed to update bitmap for ${socket.user.U_email}:`, error);
      socket.emit("bitmapError", { 
        status: "error", 
        message: "Lỗi cập nhật trạng thái online",
        error: error.message 
      });
    });

  socket.on("logout", () => {
    console.log(`User ${socket.user.U_email} đang logout...`);
    logout(socket.user.U_email)
      .then(() => {
        socket.emit("logoutSuccess", { 
          status: "success", 
          message: "Đã cập nhật trạng thái offline",
          email: socket.user.U_email 
        });
        socket.disconnect();
      })
      .catch((error) => {
        socket.emit("logoutError", { 
          status: "error", 
          message: "Lỗi cập nhật trạng thái offline",
          error: error.message 
        });
      });
  });
  
  socket.on("disconnect", (reason) => {
    if (socket.user && socket.user.U_email) {
      console.log(`User ${socket.user.U_email} disconnect: ${reason}`);
      logout(socket.user.U_email)
        .catch((error) => {
          console.error(`Lỗi khi cập nhật bitmap disconnect cho ${socket.user.U_email}:`, error);
        });
    } else {
      console.log(`Unknown user disconnect: ${reason}`);
    }
  });
})

server.listen(PORT, () => {
  console.log(`Socket server đang chạy tại http://localhost:${PORT}`)
})
