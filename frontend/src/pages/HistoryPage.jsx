import React, { useEffect, useState } from 'react';
import api from '../api/api';
import './HistoryPage.css';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await api.get('/history');
        setHistory(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement de l’historique :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleReturnToSearch = (searchParams) => {
    const queryString = new URLSearchParams(searchParams).toString();
    navigate(`/?${queryString}`);
  };

  return (
    <main className="history-page">
      <h2 className="page-title">🕘 Historique des consultations</h2>

      {loading ? (
        <div className="loader"></div>
      ) : Array.isArray(history) && history.length > 0 ? (
        history.map((entry, index) => (
          <div key={index} className="history-card">
            <h3>{entry.article.title}</h3>
            <p>{entry.article.description}</p>
            <div className="meta">
              <span>📅 Publié le : {new Date(entry.article.publishedAt).toLocaleDateString()}</span> |{' '}
              <span>🗂 Source : {entry.article.source}</span> |{' '}
              <span>🕘 Consulté le : {new Date(entry.consultedAt).toLocaleDateString()}</span>
            </div>
            <a
              href={entry.article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-link"
            >
              Lire l’article →
            </a>
            <button
              className="return-btn"
              onClick={() => handleReturnToSearch(entry.searchParams)}
            >
              🔄 Retour à la recherche
            </button>
          </div>
        ))
      ) : (
        <p className="no-results">Aucun article consulté pour le moment.</p>
      )}
    </main>
  );
};

export default HistoryPage;
