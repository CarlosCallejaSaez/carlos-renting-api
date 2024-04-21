const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.post('/', dataController.addData);
router.get('/', dataController.getAllData);

module.exports = router;