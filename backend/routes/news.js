// routes/news.js
const express = require('express');
const router = express.Router();
const { fetchAllNews } = require('../services/newsService');

router.get('/', async (req, res) => {
  try {
    const articles = await fetchAllNews(req.query);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;