const { getDatabase } = require('./db_mongo');

const collectionName = 'users';

async function insertUser(user) {
    const database = await getDatabase();
    const { insertedId } = await database.collection(collectionName).insertOne(user);
    new_user = await database.collection(collectionName).find({ _id: insertedId }).toArray();
    return new_user;
}

async function getListUsers() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

module.exports = {
    insertUser,
    getListUsers,
};