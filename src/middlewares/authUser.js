const User = require('../models/user')
const { decode } = require('../utils/jwt')
module.exports = async function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1]
    const userId = decode(token)
    try {
        const user = await User.findByPk(userId)
        req.user = user
        next()
    } catch (error) {
        res.status(400).json({ message: "User not found" })
        return
    }
}