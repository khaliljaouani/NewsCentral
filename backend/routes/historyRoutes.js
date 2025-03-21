const express = require('express');
const router = express.Router();

const { saveToHistory, getHistory } = require('../controllers/historyController');
console.log("✅ historyRoutes.js chargé");

router.post('/', saveToHistory);

router.get('/', getHistory);

module.exports = router;
