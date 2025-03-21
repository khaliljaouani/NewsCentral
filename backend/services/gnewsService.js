const axios = require('axios');

const categoryKeywords = {
  business: ['business', 'economy', 'finance', 'stock', 'market'],
  health: ['health', 'covid', 'hospital', 'vaccine', 'disease'],
  media: ['media', 'tv', 'cinema', 'series', 'netflix', 'radio'],
  science: ['science', 'research', 'space', 'discovery'],
  sport: ['sport', 'football', 'soccer', 'match', 'olympic', 'game'],
  technology: ['technology', 'tech', 'AI', 'robot', 'software', 'hardware']
};
const guessCategory = (article) => {
  const text = `${article.title} ${article.description} ${article.content}`.toLowerCase();
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(word => text.includes(word))) {
      return category;
    }
  }
  return 'general'; 
};


const getNewsFromGNews = async (filters) => {
  try {
    const { keyword, fromDate, toDate, category } = filters;
    let url = `https://gnews.io/api/v4/search?q=${keyword || ''}&token=${process.env.GNEWS_KEY}`;

    if (fromDate) url += `&from=${fromDate}`;
    if (toDate) url += `&to=${toDate}`;

    const response = await axios.get(url);
    const articles = response.data.articles || [];

    
    const normalized = articles.map(article => {
      const normalizedArticle = {
        title: article.title || '',
        description: article.description || '',
        url: article.url,
        source: 'GNews',
        image: article.image || 'https://via.placeholder.com/300x200?text=No+Image',
        publishedAt: article.publishedAt || '',
        content: article.content || ''
      };

    
      normalizedArticle.category = guessCategory(normalizedArticle);

      return normalizedArticle;
    });

   
    const finalArticles = category
      ? normalized.filter(article => article.category === category)
      : normalized;

    return finalArticles;

  } catch (error) {
    console.error('❌ Error fetching GNews:', error.message);
    return [];
  }
};

module.exports = { getNewsFromGNews };
