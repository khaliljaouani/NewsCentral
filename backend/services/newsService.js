const fetchAllNews = async (filters) => {
    try {
      // ... (votre code existant pour appeler les APIs)
  
      // Après la récupération des articles
      const articles = response.data.articles; // ou votre logique de combinaison
  
      // AJOUTER ICI LES CONSOLE.LOG
      console.log('=== DEBUG ARTICLES ===');
      console.log('Nombre d\'articles trouvés:', articles.length);
      if(articles.length > 0) {
        console.log('Premier article:', {
          titre: articles[0]?.title,
          source: articles[0]?.source?.name,
          date: articles[0]?.publishedAt
        });
      }
  
      return articles;
  
    } catch (error) {
      // ... (gestion des erreurs)
    }
  };