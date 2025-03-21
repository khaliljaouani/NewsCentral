const { getNewsFromNewsAPI } = require('../services/newsapiService');
const { getNewsFromGNews } = require('../services/gnewsService');
const { getNewsFromNYT } = require('../services/nytService');

const searchNews = async (req, res) => {
  try {
  
    const filters = {
      keyword: req.query.keyword || '',
      fromDate: req.query.fromDate || '',
      toDate: req.query.toDate || '',
      popularity: req.query.popularity || '',
      category: req.query.category || '',
      source: req.query.source || 'all'
    };

    let results = [];

    if (filters.source === 'all' || filters.source === 'newsapi') {
      const newsapiArticles = await getNewsFromNewsAPI(filters);
      results = results.concat(newsapiArticles);
    }

    if (filters.source === 'all' || filters.source === 'gnews') {
      const gnewsArticles = await getNewsFromGNews(filters);
      results = results.concat(gnewsArticles);
    }

    if (filters.source === 'all' || filters.source === 'nytimes') {
      const nytArticles = await getNewsFromNYT(filters);
      results = results.concat(nytArticles);
    }

    
    res.status(200).json(results);

  } catch (error) {
    console.error('❌ Error in newsController:', error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des actualités' });
  }
};

module.exports = { searchNews };
