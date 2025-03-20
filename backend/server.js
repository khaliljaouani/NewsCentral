const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Charger les variables d'environnement
dotenv.config();

// Créer l'instance Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
connectDB();

// Routes
app.use('/api/news', require('./routes/news'));
app.use('/api/history', require('./routes/history'));

// Démarrage du serveur
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});