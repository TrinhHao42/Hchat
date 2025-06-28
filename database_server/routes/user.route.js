const express = require('express')
const User = require('../models/user')
const checkServiceToken = require("../middleware/auth.middleware")

const router = express.Router()

router.post('/get', checkServiceToken, async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || typeof userName !== 'string') {
      return res.status(400).json({ message: 'Tên người dùng không hợp lệ' });
    }

    const user = await User.findOne({ userName: { $regex: `^${userName}$`, $options: 'i' } })

    if (!user) {
      return res.status(401).json({ message: 'Không tìm thấy người dùng' });
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }

    const { password: pwd, ...info } = user.toObject();

    return res.status(200).json(info);
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' });
  }
})

router.post('/register', checkServiceToken, async (req, res) => {
  try {
    const { user } = req.body;

    if (!user || typeof user !== 'object') {
      return res.status(400).json({ message: 'Dữ liệu người dùng không hợp lệ' });
    }

    const { userName, password, email } = user;

    if (!userName || !password || !email) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc (userName, password, email)' });
    }

    const newUser = new User(user);

    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'Tạo người dùng thành công',
      user: savedUser
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Tên người dùng hoặc email đã tồn tại' });
    }
    return res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' });
  }
});

module.exports = router;