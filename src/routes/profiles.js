const router = require('express').Router()
const upload = require('../utils/multer')
const User = require('../models/user');
const { updateProfilePhoto, getAllProfilesWithPagination, getProfile, updateProfile } = require('../controllers/profiles');
const authUser = require('../middlewares/authUser');

router.put('/profile/:id', authUser, updateProfile);

router.get('/profiles', authUser, getAllProfilesWithPagination);

router.get('/profile/:id', authUser, getProfile);

router.put('/profile/:id/photo', authUser, upload.single('photo'), updateProfilePhoto);


module.exports = router