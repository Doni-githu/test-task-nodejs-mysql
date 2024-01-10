const User = require('../models/user')


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
        const user = await User.findByPk(id)
        const { firstName, lastName, email, gender } = req.body;
        await user.update('firstName', firstName ? firstName : user.dataValues.firstName)
        await user.update('lastName', lastName ? lastName : user.dataValues.lastName)
        await user.update('email', email ? email : user.dataValues.email)
        await user.update('gender', gender ? gender : user.dataValues.gender)
        await user.save()
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

module.exports = {
    updateProfile,
    updateProfilePhoto,
    getAllProfilesWithPagination,
    getProfile,
}