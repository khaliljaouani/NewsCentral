const express = require('express');
const router = express.Router();
const History = require('../models/History');

// POST - Sauvegarder un historique
router.post('/', async (req, res) => {
  try {
    const newHistory = new History(req.body);
    const savedHistory = await newHistory.save();
    res.status(201).json(savedHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Récupérer l'historique
router.get('/', async (req, res) => {
  try {
    const histories = await History.find().sort({ viewedAt: -1 });
    res.json(histories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; // Export essentiel