const User = require("../models/user")
const registerSchema = require("../validations/registerValidation")

module.exports = async function (req, res, next) {
    const { error, value } = registerSchema.validate(req.body)
    if (error) {
        res.status(400).json(error.details)
        return
    }

    const haveSameEmail = await User.findOne({ where: { email: value.email } })
    if (haveSameEmail) {
        res.status(400).json({ message: "A user with this email already exists" })
        return
    }
    
    next()
}