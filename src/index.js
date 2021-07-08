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

// TODO: move to routes/urls
// defining endpoints
var usersRouter = require('./routes/users.routes');

app.use('/users', usersRouter);


// TODO: move them to middleware
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(err.status || 404).json({
        message: "No such route exists"
    })
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        message: "Error Message"
    })
});


// starting the server
app.listen(APP_PORT, async () => {
    console.log(`listening on port ${APP_PORT}`);
});