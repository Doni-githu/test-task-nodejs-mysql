const loginSchema = require('../validations/loginValidation')
module.exports = function (req, res, next) {
    const { error } = loginSchema.validate(req.body)
    if (error) {
        res.status(400).json(error.details)
        return
    }
    next()
}