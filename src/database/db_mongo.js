const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const MongoClient = require('mongodb');

let database = null;

async function startDatabase() {
    try {
        // Initiate a MongoMemoryServer
        const new_memory_server = new MongoMemoryServer();
        const new_db = await new_memory_server.start()
        const mongoDBURL = await new_memory_server.getUri(new_db);

        //Initiate MongoClient and connect to database
        // [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. 
        // To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
        const connection = await MongoClient.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });
        database = connection.db();
    } catch (err) {
        console.error(`Something went wrong: `, err);
    }

}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

module.exports = {
    getDatabase,
    startDatabase,
};