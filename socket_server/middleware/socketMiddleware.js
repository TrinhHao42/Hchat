const jwt = require("jsonwebtoken")
const cookie = require('cookie')

const SECRET_KEY = process.env.SECRET_KEY

const middleware = (socket, next, connectedUsers) => {
    try {
        const cookies = socket.handshake.headers.cookie
        if (!cookies) return next(new Error("Không tìm thấy cookie"))

        const parsed = cookie.parse(cookies)
        const accessToken = parsed['accessToken']
        if (!accessToken) return next(new Error("Thiếu token"))

        const user = jwt.verify(accessToken, SECRET_KEY)

        if (connectedUsers.has(user.id.U_user_name)) {
            return next(new Error("Tài khoản đã đăng nhập ở nơi khác."))
        }

        socket.user = user.id.U_user_name
        next()
    } catch (err) {
        return next(new Error(err))
    }
}

module.exports = middleware