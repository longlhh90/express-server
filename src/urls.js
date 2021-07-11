// defining endpoints
const express = require('express');
const router = express.Router();

const usersRouter = require('./routes/users.routes');


router.use('/users', usersRouter);

module.exports = router