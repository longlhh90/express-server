const { getDatabase } = require('./db_mongo');
const ObjectID = require('mongodb').ObjectID;

const collectionName = 'users';

async function insertUser(user) {
    const database = await getDatabase();
    const { insertedId } = await database.collection(collectionName).insertOne(user);
    new_user = await database.collection(collectionName).findOne({ _id: insertedId });
    return new_user
}

async function getListUsers(filter) {
    const database = await getDatabase();
    return await database.collection(collectionName).find(filter).toArray();
}

async function getUser(uid) {
    const database = await getDatabase();
    user = await database.collection(collectionName).findOne({ _id: ObjectID(uid) });
    if (user) {
        return user;
    } else {
        return "There is no user match with this ID"
    }
}

module.exports = {
    insertUser,
    getListUsers,
    getUser
};