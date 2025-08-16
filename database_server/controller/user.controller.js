const User = require('../models/User')

const getUserByEmailAndPassword = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ U_email: { $regex: `^${email}$`, $options: 'i' } })

    if (!user) {
      return res.status(401).json({ message: 'Không tìm thấy người dùng' })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Mật khẩu không đúng' })
    }

    const { U_user_name, U_avatar, U_contacts, U_email } = user.toObject()

    return res.status(200).json({ U_user_name, U_avatar, U_contacts, U_email })
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' })
  }
}

const registerNewUser = async (req, res) => {
  try {
    const { user } = req.body

    const newUser = new User(user)

    const savedUser = await newUser.save()

    res.status(201).json({
      message: 'Tạo người dùng thành công',
      user: savedUser
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Tên người dùng hoặc email đã tồn tại' })
    }
    return res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' })
  }
}

const getUserByToken = async (req, res) => {
  const { email } = req.body

  if (!email)
    return res.status(401).json({ message: 'missing email' })

  await User.findOne(
    { U_email: { $regex: `^${email}$`, $options: 'i' } },
    { _id: 0, U_user_name: 1, U_email: 1, U_avatar: 1, U_contacts: 1 }
  )
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => res.status(500).json({ message: `lỗi server: ${error.message}` }))
}

module.exports = {
  getUserByEmailAndPassword,
  registerNewUser,
  getUserByToken
}
