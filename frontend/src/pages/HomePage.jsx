// ✅ pages/HomePage.jsx (version finale avec protections & debounce)
import React, { useEffect, useState, useRef } from 'react';
import SearchFilters from '../components/SearchFilters';
import ArticleCard from '../components/ArticleCard';
import axios from '../api/api';
import './HomePage.css';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    fromDate: '',
    toDate: '',
    source: 'all',
    popularity: ''
  });

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;

  const location = useLocation();
  const debounceTimeout = useRef(null);

  // ✅ Lire les query params (si retour depuis historique)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = { ...filters };
    for (let key of params.keys()) {
      newFilters[key] = params.get(key);
    }
    setFilters(newFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // ✅ Requête automatique avec debounce (uniquement si filtres valides)
  useEffect(() => {
    const hasFilters =
      filters.keyword ||
      filters.category ||
      filters.fromDate ||
      filters.toDate ||
      (filters.source && filters.source !== 'all') ||
      filters.popularity;

    if (!hasFilters) return;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await axios.get('/news/search', { params: filters });
        setArticles(response.data);
        setCurrentPage(1);
      } catch (err) {
        console.error('Erreur récupération articles:', err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(debounceTimeout.current);
  }, [filters]);

  const handleArticleClick = async (article) => {
    try {
      console.log("✅ Article consulté :", article);
      await axios.post('/api/history', {
        article,
        searchParams: filters
      });
      window.open(article.url, '_blank');
    } catch (err) {
      console.error("Erreur enregistrement historique :", err);
    }
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="homepage-container">
      <SearchFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="loader"></div>
      ) : currentArticles.length === 0 ? (
        <p className="no-results">Aucun article trouvé.</p>
      ) : (
        <div className="articles-container">
          {currentArticles.map((article, index) => (
            <div
              key={index}
              className="article-card"
              onClick={() => handleArticleClick(article)}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => handlePagination(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
