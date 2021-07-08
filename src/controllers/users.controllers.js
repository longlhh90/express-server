const { getDatabase } = require('../database/db_mongo');
const { insertUser, getListUsers, getUser } = require('../database/user');

const getListOfUsers = async (req, res) => {
    email = req.query.email
    if (email) {
        filter = {
            email: email
        }
    } else {
        filter = {}
    }
    getDatabase().then(
        async () => {
            res.send(await getListUsers(filter));
        });
};

const getUserByID = async (req, res) => {
    uid = req.params.user_id
    getDatabase().then(
        async () => {
            res.send(await getUser(uid));
        });
};

const createUser = async (req, res) => {
    try {
        const neededKeys = ['email', 'password'];
        const user_info = req.body;
        if (!neededKeys.every(key => Object.keys(user_info).includes(key))) {
            throw new Error(`Missing keys in body request: ${neededKeys}`)
        };

        getDatabase().then(
            async () => {
                res.send(await insertUser(user_info));
            }
        )
    }
    catch (err) {
        res.status(400).send('Something broke! ' + err.message)
    }
};

module.exports = {
    getListOfUsers,
    getUserByID,
    createUser,
}