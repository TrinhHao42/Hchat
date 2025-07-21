const jwt = require("jsonwebtoken")
const axios = require("axios")
const crypto = require('crypto')
const redisClient = require('../configs/redisClient')
const transporter = require('../configs/nodeMailer')
const { mailOptions } = require('../configs/mailOption')
const cookieOptions = require('../configs/cookie')

const SECRET_KEY = process.env.SECRET_KEY
const DATA_SERVER = process.env.DATA_SERVER

const login = async (req, res) => {
  const { userName, password } = req.body

  try {
    const { data: user } = await axios.post(`${DATA_SERVER}/user/getUserByUserNameAndPassword`,
      {
        userName,
        password
      },
      {
        headers: {
          'x-service-token': process.env.INTERNAL_SERVICE_TOKEN
        }
      })

    const accessToken = jwt.sign(
      { id: user },
      SECRET_KEY,
      { expiresIn: "5m" }
    )

    const refreshToken = jwt.sign(
      { id: user },
      SECRET_KEY,
      { expiresIn: "7d" }
    )

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 10 * 60 * 1000
    })

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json(user)
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Đăng nhập thất bại"
    res.status(400).json({ message })
  }
}

const register = async (req, res) => {
  const { email, userName, password } = req.body

  try {
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const userData = { U_email: email, U_user_name: userName, U_password: password }


    await redisClient.set(`verify:${verificationToken}`, JSON.stringify(userData), {
      EX: 60,
    })

    const mailConfig = mailOptions(email, verificationToken)
    await transporter.sendMail(mailConfig)

    res.status(200).json({ message: 'Email xác thực đã được gửi' })
  }
  catch (err) {
    console.error('Lỗi khi gửi email xác thực:', err)
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' })
  }
}

const verificationRegisterToken = async (req, res) => {
  const { token } = req.params

  try {
    const userDataString = await redisClient.get(`verify:${token}`)
    if (!userDataString) {
      return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' })
    }

    const userData = JSON.parse(userDataString)

    const { data: newUser } = await axios.post(`${DATA_SERVER}/user/registerNewUser`,
      { user: userData }
    )

    if (!newUser) {
      return res.status(500).json({ message: 'Không thể tạo tài khoản, vui lòng thử lại' })
    }

    await redisClient.del(`verify:${token}`)

    return res.status(200).json({ message: 'Xác thực thành công, bạn có thể đăng nhập' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const checkAccessToken = (req, res) => {
  try {
    const accessToken = req.cookies.accessToken

    if (!accessToken) {
      return res.status(401).json({ error: "missing_token", message: "Thiếu token xác thực" })
    }

    jwt.verify(accessToken, process.env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({ error: "token_expired", message: "Token hết hạn" })
        }
        return res.status(401).json({ error: "invalid_token", message: "Sai token" })
      }

      const response = await axios.post(`${DATA_SERVER}/user/getUserByToken`,
        { email: decoded.id.U_email },
        {
        headers: {
          'x-service-token': process.env.INTERNAL_SERVICE_TOKEN
        }
      })

      return res.status(200).json({ user: response.data })
    })
  } catch (err) {
    console.error("Lỗi trong checkAccessToken:", err)
    return res.status(500).json({ error: "internal_server_error", message: "Lỗi máy chủ" })
  }
}


const refreshAccessToken = (req, res) => {

}


module.exports = {
  login,
  register,
  verificationRegisterToken,
  checkAccessToken,
  refreshAccessToken
}