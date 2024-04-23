const express = require('express');
const router = express.Router();
const subscribersController = require('../controllers/subscribersController');

router.post('/', subscribersController.createSubscribers);

module.exports = router;