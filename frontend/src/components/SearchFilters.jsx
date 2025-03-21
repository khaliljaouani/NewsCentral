import React from 'react';
import './SearchFilters.css';

const SearchFilters = ({ filters, onChange }) => {
  return (
    <div className="filters-container">
      <input
        type="text"
        placeholder="Mot-clé..."
        name="keyword"
        value={filters.keyword}
        onChange={onChange}
      />

      <select name="category" value={filters.category} onChange={onChange}>
        <option value="">Catégorie</option>
        <option value="business">Business</option>
        <option value="health">Santé</option>
        <option value="sport">Sport</option>
        <option value="science">Science</option>
        <option value="media">Média</option>
        <option value="technology">Technologie</option>
      </select>

      <input
        type="date"
        name="fromDate"
        value={filters.fromDate}
        onChange={onChange}
      />
      <input
        type="date"
        name="toDate"
        value={filters.toDate}
        onChange={onChange}
      />

      <select name="source" value={filters.source} onChange={onChange}>
        <option value="all">Toutes les sources</option>
        <option value="newsapi">NewsAPI</option>
        <option value="gnews">GNews</option>
        <option value="nytimes">NYTimes</option>
      </select>

      <select name="popularity" value={filters.popularity} onChange={onChange}>
        <option value="">Popularité</option>
        <option value="publishedAt">Date</option>
        <option value="popularity">Popularité</option>
        <option value="relevancy">Pertinence</option>
      </select>
    </div>
  );
};

export default SearchFilters;
