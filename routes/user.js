const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

// User
router.get('/', userController.user.get);
router.delete('/', userController.user.delete);

module.exports = router;
