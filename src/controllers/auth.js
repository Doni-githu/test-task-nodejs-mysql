const User = require('../models/user')
const bcrypt = require('bcrypt');
const { encode } = require('../utils/jwt');
const filterObject = require('../utils/filterObject')

async function loginUser(req, res) {
    try {
        const { email, password: pass } = req.body
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "User not found, check email" })
            return
        }

        const matchPassword = await bcrypt.compare(pass, user.password)
        if (!matchPassword) {
            res.status(400).json({ message: "Wrong Password, Try again" })
            return
        }

        const token = encode(user.id)
        const value = filterObject(user.dataValues, ['password'])
        res.json({ token, user: value });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

async function registerUser(req, res) {
    try {
        const { firstName, email, password } = req.body;
        const user = await User.create({ firstName, email, password });
        const token = encode(user.id)
        const value = filterObject(user.dataValues, ['password'])
        res.status(201).json({ user: value, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getUserByToken(req, res) {

}

module.exports = {
    loginUser,
    registerUser
}