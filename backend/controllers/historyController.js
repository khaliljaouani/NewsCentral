const History = require('../models/History');

const saveToHistory = async (req, res) => {
    try {
      
      console.log("🔍 req.body :", req.body);
  
      const { article, searchParams } = req.body;
  
      const newEntry = new History({
        article,
        searchParams,
        consultedAt: new Date(),
      });
  
      await newEntry.save();
  
      res.status(201).json({ message: 'Article enregistré dans l’historique ✅' });
    } catch (error) {
      console.error("Erreur saveToHistory:", error);
      res.status(500).json({ message: "Erreur lors de l’enregistrement de l’article dans l’historique" });
    }
  };
const getHistory = async (req, res) => {
  try {
    const history = await History.find().sort({ consultedAt: -1 });

    
    res.json(history); 
  } catch (error) {
    console.error("Erreur getHistory:", error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'historique" });
  }
};

module.exports = {
  saveToHistory,
  getHistory,
};
