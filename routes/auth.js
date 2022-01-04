const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

// Github
router.get('/github', authController.github);
router.get('/google', authController.google);

// Guest signin
router.get('/guest', authController.guest);

// logout
router.post('/logout', authController.logout);

module.exports = router;
