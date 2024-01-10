const { registerUser, loginUser } = require('../controllers/auth');
const loginValidation = require('../middlewares/loginValidation');
const registerValidation = require('../middlewares/registerValidation');

const router = require('express').Router()


router.post('/register', registerValidation, registerUser);

router.post('/login', loginValidation, loginUser);


module.exports = router