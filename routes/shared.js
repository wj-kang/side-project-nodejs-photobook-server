const express = require('express');
const router = express.Router();
const sharedController = require('../controller/shared');

// Shared
router.get('/:albumTag', sharedController.get);

module.exports = router;
