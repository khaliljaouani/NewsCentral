// pages/HistoryPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoryPage = ({ setFilters }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await axios.get("http://localhost:5000/api/history");
      setHistory(response.data);
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Historique</h2>
      {history.map(entry => (
        <div key={entry._id}>
          <h3>{entry.article.title}</h3>
          <button onClick={() => setFilters(entry.searchParams)}>
            Relancer cette recherche
          </button>
        </div>
      ))}
    </div>
  );
};

export default HistoryPage;