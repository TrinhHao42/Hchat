const User = require('../../database_server/models/User')

// Tìm kiếm bạn bè theo tên hoặc email
const searchUser = async (req, res) => {
  try {
    const { query } = req.query
    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Thiếu từ khóa tìm kiếm' })
    }
    // Tìm theo tên hoặc email, không phân biệt hoa thường, có thể khớp một phần
    const users = await User.find({
      $or: [
        { U_user_name: { $regex: query, $options: 'i' } },
        { U_email: { $regex: query, $options: 'i' } }
      ]
    }).select('-U_password') // Không trả về password
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi tìm kiếm', error: err.message })
  }
}

module.exports = { searchUser }
