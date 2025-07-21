const jwt = require("jsonwebtoken")

const SECRET_KEY = process.env.SECRET_KEY

const signToken = (userData, timeLife) => {
    return jwt.sign({ id: userData }, SECRET_KEY, { expiresIn: timeLife })
}

const decodedToken = (token) => {
    let error = null
    let decoded = null

    try {
        decoded = jwt.verify(token, SECRET_KEY)
    } catch (error) {
        error = error.message
    }

    return { error, decoded }
}

module.exports = {
    signToken,
    decodedToken
}
