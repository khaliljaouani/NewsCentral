// pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchFilters from "../components/SearchFilters";
import NewsCards from "../components/NewsCards"; // Remplace NewsTable par NewsCards

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async (filters) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/news", { params: filters });
      setArticles(response.data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles({ category: "technology" }); // Chargement initial
  }, []);

  return (
    <div className="home-page">
      <SearchFilters onSearch={fetchArticles} />
      <NewsCards articles={articles} loading={loading} /> {/* Affichage sous forme de cartes */}
    </div>
  );
};

export default HomePage;
