import React from 'react';

const ArticleList = ({ articles }) => {
  return (
    <div className="article-list">
      {articles.map(article => (
        <div key={article.url} className="article-item">
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
};

// Ne pas oublier l'export
export default ArticleList;