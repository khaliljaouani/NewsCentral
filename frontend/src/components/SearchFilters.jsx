import React from 'react';
import './SearchFilters.css';

const SearchFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filters-container">
      <input
        type="text"
        name="keyword"
        value={filters.keyword}
        onChange={handleChange}
        placeholder="Mot-clé"
        className="filter-input"
      />

      <select name="category" value={filters.category} onChange={handleChange} className="filter-select">
        <option value="">Catégorie</option>
        <option value="business">Business</option>
        <option value="health">Santé</option>
        <option value="media">Média</option>
        <option value="science">Science</option>
        <option value="sport">Sport</option>
        <option value="technology">Technologie</option>
      </select>

      <label className="filter-label">De :</label>
      <input
        type="date"
        name="fromDate"
        value={filters.fromDate}
        onChange={handleChange}
        className="filter-input"
        min="2025-02-21"
      />

      <label className="filter-label">À :</label>
      <input
        type="date"
        name="toDate"
        value={filters.toDate}
        onChange={handleChange}
        className="filter-input"
      />

      <select name="source" value={filters.source} onChange={handleChange} className="filter-select">
        <option value="all">Toutes les sources</option>
        <option value="newsapi">NewsAPI</option>
        <option value="gnews">GNews</option>
        <option value="nytimes">NYTimes</option>
      </select>

      <select name="popularity" value={filters.popularity} onChange={handleChange} className="filter-select">
        <option value="">Popularité</option>
        <option value="relevancy">Pertinence</option>
        <option value="popularity">Popularité</option>
        <option value="publishedAt">Date de publication</option>
      </select>
    </div>
  );
};

export default SearchFilters;