const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/', async (req, res) => {
  try {
    const apiKey = process.env.API_NEWS; 

    const news = await newsController.getBusinessNews(apiKey);

    res.json(news);
  } catch (error) {
    console.error('Error getting business news:', error);
    res.status(500).json({ error: 'There was an error getting business news' });
  }
});

module.exports = router;
