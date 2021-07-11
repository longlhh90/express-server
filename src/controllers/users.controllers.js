const { getDatabase } = require('../database/db_mongo');
const { insertUser, getListUsers, getUser } = require('../database/user');
const { ValidationError } = require('../middleware/exceptions');

const getListOfUsers = async (req, res, next) => {
    email = req.query.email
    if (email) {
        filter = {
            email: email
        }
    } else {
        filter = {}
    }

    try {
        res.send(await getListUsers(filter));
    } catch (err) {
        next(err)
    }
};

const getUserByID = async (req, res, next) => {
    uid = req.params.user_id
    try {
        res.send(await getUser(uid));
    } catch (err) {
        next(err)
    }
};

const createUser = async (req, res, next) => {
    try {
        const neededKeys = ['email', 'password'];
        const user_info = req.body;
        if (!neededKeys.every(key => Object.keys(user_info).includes(key))) {
            throw new ValidationError(`Missing keys in body request: ${neededKeys}`)
        };

        res.send(await insertUser(user_info));
    }
    catch (err) {
        next(err)
    }
};

module.exports = {
    getListOfUsers,
    getUserByID,
    createUser,
}