const axios = require('axios');
const moment = require('moment');

const getNewsFromNYT = async (filters) => {
  const { keyword, category, fromDate, toDate } = filters;
  console.log('📤 NYT Filters utilisés :', filters);

  if (!keyword && !category && !fromDate && !toDate  && !filters.source) return [];

  const query = keyword || category || '';
  const params = {
    q: query,
    'api-key': process.env.NYTIMES_KEY
  };

  if (fromDate && moment(fromDate).isSameOrAfter('2025-02-21')) {
    params.begin_date = moment(fromDate).format('YYYYMMDD');
  }
  if (toDate) {
    params.end_date = moment(toDate).format('YYYYMMDD');
  }

  try {
    const res = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', { params });
    const articles = res.data.response?.docs || [];

    let filteredArticles = articles.map(a => ({
      title: a.headline?.main || '',
      description: a.abstract || '',
      url: a.web_url,
      image: a.multimedia?.length
        ? `https://www.nytimes.com/${a.multimedia[0].url}`
        : '',
      source: 'NYTimes',
      publishedAt: a.pub_date,
      category: ''
    }));

    if (category) {
      const lowerCategory = category.toLowerCase();
      filteredArticles = filteredArticles.filter(a =>
        (a.title?.toLowerCase().includes(lowerCategory)) ||
        (a.description?.toLowerCase().includes(lowerCategory))
      );
    }

    return filteredArticles;
  } catch (err) {
    console.error('❌ Error fetching NYTimes:', err.response?.data || err.message);
    return [];
  }
};

module.exports = { getNewsFromNYT };
