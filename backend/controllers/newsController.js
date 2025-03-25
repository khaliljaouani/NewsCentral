const { getNewsFromGNews } = require('../services/gnewsService');
const { getNewsFromNewsAPI } = require('../services/newsapiService');
const { getNewsFromNYT } = require('../services/nytService');

const searchNews = async (req, res) => {
  try {
    const filters = req.query;
    const source = filters.source || 'all';

    let allArticles = [];

    if (source === 'gnews' || source === 'all') {
      const gnewsArticles = await getNewsFromGNews(filters);
      allArticles = allArticles.concat(gnewsArticles);
    }

    if (source === 'newsapi' || source === 'all') {
      const newsapiArticles = await getNewsFromNewsAPI(filters);
      allArticles = allArticles.concat(newsapiArticles);
    }

    if (source === 'nytimes' || source === 'all') {
      const nytArticles = await getNewsFromNYT(filters);
      allArticles = allArticles.concat(nytArticles);
    }

    // Optionnel : Trier les résultats par date descendante
    allArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    res.json(allArticles);
  } catch (err) {
    console.error('❌ Erreur dans searchNews:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la recherche d’articles.' });
  }
};

module.exports = { searchNews };
