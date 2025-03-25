const axios = require('axios');
const moment = require('moment');

const getNewsFromNewsAPI = async (filters) => {
  const { keyword, category, fromDate, toDate, popularity } = filters;

  if (!keyword && !category && !fromDate && !toDate && !filters.source) return [];

  const query = (keyword && keyword.trim()) || (category && category.trim()) || '';

  const params = {
    q: query,
    apiKey: process.env.NEWSAPI_KEY,
    language: 'fr',
    pageSize: 20
  };

  if (fromDate && moment(fromDate).isSameOrAfter('2025-02-21')) {
    params.from = fromDate;
  }
  if (toDate) {
    params.to = toDate;
  }
  if (popularity) {
    params.sortBy = popularity;
  }

  console.log("📤 NewsAPI Filters utilisés :", filters);

  try {
    const res = await axios.get('https://newsapi.org/v2/everything', { params });
    const articles = res.data.articles || [];

    return articles.map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.urlToImage || '',
      source: a.source.name || 'NewsAPI',
      publishedAt: a.publishedAt
    }));
  } catch (err) {
    console.error('❌ Error fetching NewsAPI:', err.response?.data || err.message);
    return [];
  }
};

module.exports = { getNewsFromNewsAPI };
