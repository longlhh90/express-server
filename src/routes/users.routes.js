const express = require('express');
const userControllers = require('../controllers/users.controllers');
const router = express.Router();

router.post('/', userControllers.createUser);
router.get('/', userControllers.getListOfUsers);
router.get('/:user_id', userControllers.getUserByID);

module.exports = router