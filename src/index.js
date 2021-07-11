// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const urls = require('./urls');
const { exception_handler, not_found_exception } = require('./middleware/error_handlers.middleware')

// defining database 
const { startDatabase } = require('./database/db_mongo');

// defining the Express app
const app = express();

// get config vars
dotenv.config();
// access config var
const APP_PORT = process.env.APP_PORT;


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

// adding endpoint urls
app.use('/', urls);

// errors handling
app.use(exception_handler);
app.use(not_found_exception);


// starting the server
app.listen(APP_PORT, async () => {
    console.log(`listening on port ${APP_PORT}`);
});