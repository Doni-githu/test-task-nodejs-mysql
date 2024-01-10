const Joi = require('joi');

// Validation schema for register
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    password: Joi.string().min(6).required()
});

module.exports = registerSchema