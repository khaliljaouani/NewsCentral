import React, { useState } from 'react';

const SearchFilters = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    keyword: '',
    category: 'general'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Rechercher des articles..."
        value={filters.keyword}
        onChange={(e) => setFilters({...filters, keyword: e.target.value})}
      />
      
      <select
        value={filters.category}
        onChange={(e) => setFilters({...filters, category: e.target.value})}
      >
        <option value="general">Général</option>
        <option value="business">Business</option>
        <option value="technology">Technologie</option>
        <option value="sports">Sports</option>
      </select>

      <button type="submit">Rechercher</button>
    </form>
  );
};

export default SearchFilters;