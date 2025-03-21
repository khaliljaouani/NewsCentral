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


const getNewsFromNYT = async (filters) => {
  try {
    const { keyword, fromDate, toDate, category } = filters;

  
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NYT_KEY}`;

    const response = await axios.get(url);
    const books = response.data.results.books || [];

  
    const normalized = books.map(book => {
      const normalizedArticle = {
        title: book.title || '',
        description: book.description || '',
        url: book.amazon_product_url || '',
        source: 'NYTimes',
        image: book.book_image || 'https://via.placeholder.com/300x200?text=No+Image',
        publishedAt: response.data.results.published_date || '', // même date pour tous les livres
        content: `${book.title} ${book.description} ${book.author}` // contenu simulé
      };

      // ✅ Ajout du champ category détecté automatiquement
      normalizedArticle.category = guessCategory(normalizedArticle);

      return normalizedArticle;
    });

    

    let finalArticles = normalized;

    
    if (keyword) {
      finalArticles = finalArticles.filter(article =>
        article.title.toLowerCase().includes(keyword.toLowerCase()) ||
        article.description.toLowerCase().includes(keyword.toLowerCase()) ||
        article.content.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    
    if (fromDate) {
      finalArticles = finalArticles.filter(article => article.publishedAt >= fromDate);
    }
    if (toDate) {
      finalArticles = finalArticles.filter(article => article.publishedAt <= toDate);
    }

    
    if (category) {
      finalArticles = finalArticles.filter(article => article.category === category);
    }

    return finalArticles;

  } catch (error) {
    console.error('❌ Error fetching NYTimes:', error.message);
    return [];
  }
};


module.exports = { getNewsFromNYT };
