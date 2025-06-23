const jwt = require('jsonwebtoken')

const checkAPIToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Thiếu token' })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: 'Token không hợp lệ' })
    }
}

module.exports = { checkAPIToken }