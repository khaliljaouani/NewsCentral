const axios = require('axios');
const moment = require('moment');

const getNewsFromGNews = async (filters) => {
  const { keyword, category, fromDate, toDate } = filters;

  if (!keyword && !category && !fromDate && !toDate  && !filters.source) return [];

  const query = (keyword && keyword.trim()) || (category && category.trim()) || 'le';// solutions pour l obligation de l' api 

  const params = {
    q: query,
    token: process.env.GNEWS_KEY,
    lang: 'fr',
    max: 20
  };

  if (fromDate && moment(fromDate).isSameOrAfter('2025-02-21')) {
    params.from = fromDate;
  }
  if (toDate) {
    params.to = toDate;
  }

  console.log("📤 GNews Filters utilisés :", params);

  try {
    const res = await axios.get('https://gnews.io/api/v4/search', { params });
    const articles = res.data.articles || [];

    return articles.map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.image || '',
      source: 'GNews',
      publishedAt: a.publishedAt
    }));
  } catch (err) {
    console.error('❌ Error fetching GNews:', err.response?.data || err.message);
    return [];
  }
};

module.exports = { getNewsFromGNews };
