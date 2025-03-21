import React from "react";
import { useNavigate } from "react-router-dom";
import articlesData from "../data/articles.json"; // Import du fichier JSON
import "../style/NewsCards.css";


const NewsCards = () => {
  const navigate = useNavigate();

  return (
    <div className="news-cards-container">
      {articlesData.length > 0 ? (
        <div className="news-grid">
          {articlesData.map((article, index) => (
            <div
              key={index}
              className="news-card"
              onClick={() => navigate(`/article/${index}`, { state: { article } })}
            >
              <img
                src={article.urlToImage || "https://picsum.photos/300/200?random=1"}
                alt={article.title || "Image non disponible"}
                className="news-image"
              />
              <div className="news-content">
                <h3>{article.title || "Titre non disponible"}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-articles">Aucun article disponible</div>
      )}
    </div>
  );
};

export default NewsCards;
