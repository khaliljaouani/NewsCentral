import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchFilters from '../components/SearchFilters';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import api from '../api/api';
import './HomePage.css';

const HomePage = () => {
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    fromDate: '',
    toDate: '',
    popularity: '',
    source: 'all',
  });

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;
  const [searchParams] = useSearchParams();

  // 🔁 Lire les query params (au 1er chargement)
  useEffect(() => {
    const newFilters = { ...filters };
    for (const key of Object.keys(newFilters)) {
      const param = searchParams.get(key);
      if (param !== null) newFilters[key] = param;
    }
    setFilters(newFilters);
  }, []);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await api.get('/news/search', { params: filters });
        setArticles(response.data);
        setCurrentPage(1);
      } catch (error) {
        console.error('Erreur chargement articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleArticleClick = async (article) => {
    try {
      const historyPayload = {
        article: {
          title: article.title,
          description: article.description,
          url: article.url,
          source: article.source,
          publishedAt: article.publishedAt,
        },
        searchParams: filters,
      };

      await api.post('/history', historyPayload);
      window.open(article.url, '_blank');
    } catch (error) {
      console.error('Erreur enregistrement historique:', error);
    }
  };
  
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <main className="homepage">
      <h2 className="page-title">🔍 Explorez les Actualités</h2>
      <SearchFilters filters={filters} onChange={handleFilterChange} />

      {loading ? (
        <div className="loader"></div>
      ) : articles.length === 0 ? (
        <p className="no-results">Aucun article trouvé.</p>
      ) : (
        <>
          {currentArticles.map((article, index) => (
            <div key={index} className="article-card" onClick={() => handleArticleClick(article)}>
              <ArticleCard article={article} />
            </div>
          ))}
          {articles.length > articlesPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </>
      )}
    </main>
  );
};

export default HomePage;
