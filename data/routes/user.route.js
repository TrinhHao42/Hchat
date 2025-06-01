const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.post('/user/get', async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || typeof userName !== 'string') {
      return res.status(400).json({ message: 'Tên người dùng không hợp lệ' });
    }

    const user = await User.findOne({ userName: { $regex: `^${userName}$`, $options: 'i' } })

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(404).json({ message: 'Mật khẩu không đúng' });
    }

    const { password: pwd, ...info } = user.toObject();

    res.status(200).json(info);
  } catch (error) {
    console.error('Lỗi khi tìm kiếm người dùng:', error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' });
  }
})

router.post('/user/add', async (req, res) => {
  try {
    const { user } = req.body;

    console.log(user)

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
    });
  } catch (error) {
    console.error('Lỗi khi tạo người dùng:', error);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Tên người dùng hoặc email đã tồn tại' });
    }
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' });
  }
});

module.exports = router;