const Joi = require('joi');

// Validation schema for login
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});


module.exports = loginSchema