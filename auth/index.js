const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = 3001;
const SECRET_KEY = process.env.SECRET_KEY;

console.log(SECRET_KEY)

app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  console.log("Nhận yêu cầu đăng nhập:", { userName, password });

  if (!userName || !password) {
    return res.status(400).json({ message: "Thiếu tên đăng nhập hoặc mật khẩu" });
  }

  try {
    const { data: user } = await axios.post("http://localhost:3000/user", {
      userName,
    });

    if (!user) {
      return res.status(400).json({ message: "Không tìm thấy người dùng" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.userName },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({redirectTo: '/user/chatroom', token, socketServer: "http://localhost:3002"});
  } catch (err) {
    console.error("Lỗi auth server:", err.message);
    res.status(400).json({ message: err.message || "Đăng nhập thất bại" });
  }
});

app.listen(port, () => {
  console.log(`Auth server đang chạy tại http://localhost:${port}`);
});