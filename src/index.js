// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// defining database 
const { startDatabase } = require('./database/db_mongo');

// defining the Express app
const app = express();

// defining database 
const { startDatabase, getDatabase } = require('./database/db_mongo');
const { insertUser, getListUsers, getUser } = require('./database/user');

// start the in-memory MongoDB instance
startDatabase().then(async () => {
    console.log("Database started!")
})

// adding Helmet to enhance your API's security
app.use(helmet());


// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// get config vars
dotenv.config();

// access config var
const APP_PORT = process.env.APP_PORT;
// defining endpoints
app.get('/users/', (req, res) => {
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
});

app.get('/users/:user_id/', (req, res) => {
    uid = req.params.user_id
    getDatabase().then(
        async () => {
            res.send(await getUser(uid));
        });
});

app.post('/users/', (req, res) => {
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
})

// starting the server
app.listen(APP_PORT, async () => {
    console.log(`listening on port ${APP_PORT}`);
});