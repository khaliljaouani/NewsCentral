// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require('axios');


// Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connecté à MongoDB !"))
  .catch(err => console.error("Échec de connexion à MongoDB :", err));


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connecté à MongoDB !"))
  .catch(err => console.error("Échec de connexion à MongoDB :", err));

  const newsAPI = axios.create({
    baseURL: "https://newsapi.org/v2",
    params: { apiKey: process.env.NEWSAPI_KEY }
  });
  
  // Testez une requête
  newsAPI.get("/everything?q=technology&language=fr")
    .then(response => console.log("NewsAPI fonctionne !", response.data.articles[0]))
    .catch(err => console.error("Erreur NewsAPI :", err.message));