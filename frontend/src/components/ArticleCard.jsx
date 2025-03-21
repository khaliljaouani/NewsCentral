import React from 'react';
import './ArticleCard.css';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <img
        src={article.image || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={article.title}
      />
      <div className="article-card-content">
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <div className="article-meta">
          <span>{article.source}</span> | <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-link">
          Voir l'article →
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
