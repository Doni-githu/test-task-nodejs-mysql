const jwt = require('jsonwebtoken')


const encode = (id) => {
    const token = jwt.sign({ userId: id }, 'secret_key');
    return token
}

const decode = (token) => {
    const userId = jwt.decode(token, { complete: true }).payload.userId
    return userId
}

module.exports = { encode, decode }