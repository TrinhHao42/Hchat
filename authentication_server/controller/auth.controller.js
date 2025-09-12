const jwt = require("jsonwebtoken")
const axios = require("axios")
const crypto = require('crypto')
const transporter = require('../configs/nodeMailer')
const { mailOptions } = require('../configs/mailOption')
const cookieOptions = require('../configs/cookie')

const SECRET_KEY = process.env.SECRET_KEY
const DATA_SERVER = process.env.DATA_SERVER

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: "error", message: "Email và mật khẩu là bắt buộc!", code: "INVALID_INPUT" });
  }

  try {
    const { data: { result: isLogin } } = await axios.post(
      `${DATA_SERVER}/bitmap/bitmapGet`,
      {
        key: `userIsLogin`,
        value: email
      },
      { headers: { "x-service-token": process.env.INTERNAL_SERVICE_TOKEN } }
    );

    if (isLogin) {
      return res.status(403).json({ status: "error", message: "Tài khoản đang đăng nhập nơi khác.", code: "SESSION_ACTIVE" });
    }

    const { data: user } = await axios.post(
      `${DATA_SERVER}/user/getUserByEmailAndPassword`,
      { email, password },
      { headers: { "x-service-token": process.env.INTERNAL_SERVICE_TOKEN } }
    );

    if (!user) {
      return res.status(401).json({ status: "error", message: "Email hoặc mật khẩu không đúng!", code: "INVALID_CREDENTIALS" });
    }

    const accessToken = jwt.sign({ id: user }, process.env.SECRET_KEY, { expiresIn: "5m" });
    const refreshToken = jwt.sign({ id: user }, process.env.SECRET_KEY, { expiresIn: "7d" });


    res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 10 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    await axios.post(
      `${DATA_SERVER}/bitmap/bitmapAppend`,
      {
        key: 'userIsLogin',
        value: email,
        status: 1,
      },
      { headers: { "x-service-token": process.env.INTERNAL_SERVICE_TOKEN } }
    )

    return res.status(200).json({ status: "success", data: user, message: "Đăng nhập thành công!" });
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response;
      const errors = {
        400: { message: data.message || "Dữ liệu không hợp lệ!", code: "BAD_REQUEST" },
        401: { message: data.message || "Thông tin xác thực không hợp lệ!", code: "UNAUTHORIZED" },
        500: { message: data.message || "Lỗi máy chủ. Thử lại sau!", code: "SERVER_ERROR" },
      };
      const error = errors[status] || { message: data.message || "Lỗi không xác định!", code: "UNKNOWN_ERROR" };
      return res.status(status || 500).json({ status: "error", ...error });
    }

    return res.status(503).json({ status: "error", message: "Không kết nối được máy chủ!", code: "SERVICE_UNAVAILABLE" });
  }
};

const register = async (req, res) => {
  const { email, userName, password } = req.body

  try {
    const result = await axios.post(
      `${DATA_SERVER}/bitmap/bitmapGet`,
      {
        key: 'emailRegisted',
        value: email,
      },
      { headers: { "x-service-token": process.env.INTERNAL_SERVICE_TOKEN } }
    )

    if (result.data.result)
      res.status(400).json({ message: 'Email đã được sử dụng để tạo tài khoản' })

    const verificationToken = crypto.randomBytes(32).toString('hex')
    const userData = { U_email: email, U_user_name: userName, U_password: password }

    await axios.post(`${DATA_SERVER}/access/accessAppend`,
      {
        key: `verify:${verificationToken}`,
        value: JSON.stringify(userData),
        ttl: 60 * 60
      },
      {
        headers: {
          'x-service-token': process.env.INTERNAL_SERVICE_TOKEN
        }
      })

    const mailConfig = mailOptions(email, verificationToken)
    await transporter.sendMail(mailConfig)

    res.status(200).json({ message: 'Email xác thực đã được gửi' })
  }
  catch (err) {
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' })
  }
}

const verificationRegisterToken = async (req, res) => {
  const { token } = req.params;

  if (!token || typeof token !== 'string' || token.length < 1) {
    return res.status(400).json({ message: 'Chứng thực không hợp lệ' });
  }

  try {
    const userDataResponse = await axios.post(
      `${process.env.DATA_SERVER}/access/accessGet`,
      { key: `verify:${token}` },
      {
        headers: {
          'x-service-token': process.env.INTERNAL_SERVICE_TOKEN,
        },
      }
    );

    if (!userDataResponse?.data?.result) {
      return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }

    const userData = JSON.parse(userDataResponse.data.result);

    const { data: newUser } = await axios.post(
      `${process.env.DATA_SERVER}/user/registerNewUser`,
      { user: userData },
      {
        headers: {
          'x-service-token': process.env.INTERNAL_SERVICE_TOKEN,
        },
      }
    );

    if (!newUser) {
      return res.status(500).json({ message: 'Không thể tạo tài khoản, vui lòng thử lại.' });
    }

    await axios.post(
      `${DATA_SERVER}/bitmap/bitmapAppend`,
      {
        key: 'emailRegisted',
        value: userData.U_email,
        status: 1,
      },
      { headers: { "x-service-token": process.env.INTERNAL_SERVICE_TOKEN } }
    )

    await axios.delete(`${process.env.DATA_SERVER}/access/accessRemove`, {
      data: { key: `verify:${token}` },
      headers: {
        'x-service-token': process.env.INTERNAL_SERVICE_TOKEN,
      },
    });

    return res.status(200).json({ message: 'Xác thực thành công, bạn có thể đăng nhập.' });
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ message: 'Chứng thực không hợp lệ.' });
    }
    return res.status(500).json({
      message: err.response?.data?.message || 'Lỗi xác thực. Vui lòng thử lại.',
    });
  }
};

const checkAccessToken = async (req, res) => {
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

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      return res.status(401).json({ error: "missing_token", message: "Thiếu token xác thực" })
    }

    jwt.verify(refreshToken, process.env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Phiên đăng nhập kết thúc" })
      }

      const response = await axios.post(`${DATA_SERVER}/user/getUserByToken`,
        { email: decoded.id.U_email },
        {
          headers: {
            'x-service-token': process.env.INTERNAL_SERVICE_TOKEN
          }
        })

      const accessToken = jwt.sign(
        { id: response.data },
        SECRET_KEY,
        { expiresIn: "5m" }
      )

      res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 10 * 60 * 1000
      })

      return res.status(200).json({ user: response.data })
    })
  } catch (error) {
    console.log("Lỗi khi refreshAccessToken", error)
    return res.status(500).json({ error: "internal_server_error", message: "Lỗi máy chủ" })
  }
}

const logout = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(400).json({ message: "Không tìm thấy accessToken" });
    }

    let decoded;

    try {
      decoded = jwt.verify(accessToken, SECRET_KEY);
    } catch (err) {
      decoded = null;
    }

    if (decoded) {
      const email = decoded.id?.U_email || decoded.id?.email;
      if (email) {
        await axios.post(
          `${DATA_SERVER}/bitmap/bitmapAppend`,
          {
            key: 'userIsLogin',
            value: email,
            status: 0,
          },
          { headers: { "x-service-token": process.env.INTERNAL_SERVICE_TOKEN } }
        )
          .then(() => {
            res.clearCookie("accessToken", { ...cookieOptions });
            res.clearCookie("refreshToken", { ...cookieOptions });

            res.status(200).json({ message: "Đăng xuất hoàn toàn thành công" });
          })
          .catch(error => {
            res.status(400).json({ message: "lỗi trong quá trình logout" + error.data.message })
          })
      }
    }
  } catch (err) {
    console.error("Lỗi khi đăng xuất:", err);
    res.status(500).json({ message: "Lỗi server khi đăng xuất" });
  }
};


module.exports = {
  login,
  register,
  verificationRegisterToken,
  checkAccessToken,
  refreshAccessToken,
  logout
}