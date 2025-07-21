const jwt = require('jsonwebtoken')

const checkAPIToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken

    if (!accessToken) {
        return res.status(401).json({ message: 'Thiếu token' })
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: 'Token không hợp lệ' })
    }
}

module.exports = { checkAPIToken }