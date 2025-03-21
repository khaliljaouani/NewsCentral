// components/NewsList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsList = ({ filters }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get("http://localhost:5000/api/news", { params: filters });
      setArticles(response.data);
    };
    fetchArticles();
  }, [filters]);

  const handleArticleClick = async (article) => {
    // Enregistrer dans l'historique
    await axios.post("http://localhost:5000/api/history", {
      article,
      searchParams: filters
    });
    // Rediriger vers l'article (optionnel)
    window.open(article.url, "_blank");
  };

  return (
    <div>
      {articles.map(article => (
        <div key={article.url} onClick={() => handleArticleClick(article)} className="article-card">
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <small>Source : {article.source?.name} • {new Date(article.publishedAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
};

export default NewsList;