import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const fetchNews = async (params) => {
  try {
    const response = await api.get('/news/search', { params });
    return response.data;
  } catch (error) {
    console.error('Erreur API:', error);
    return { articles: [], totalResults: 0 };
  }
};