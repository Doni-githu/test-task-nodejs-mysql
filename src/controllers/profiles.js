const User = require('../models/user')
const upload = require('../utils/multer')


async function getAllProfilesWithPagination(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const users = await User.findAndCountAll({
            attributes: { exclude: ['password'] },
            order: [['registrationDate', 'DESC']],
            limit,
            offset,
        });
        res.status(200).json(users.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateProfile(req, res) {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, gender } = req.body;
        await User.update({ firstName, lastName, email, gender }, { where: { id } });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getProfile(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateProfilePhoto(req, res) {
    try {
        const { id } = req.params;
        const photo = req.file.filename;
        await User.update({ photo }, { where: { id } });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports ={ 
    updateProfile,
    updateProfilePhoto,
    getAllProfilesWithPagination,
    getProfile,
}