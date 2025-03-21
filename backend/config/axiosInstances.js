import axios from 'axios';

export const newsAPI = axios.create({
  baseURL: 'https://newsapi.org/v2',
  params: { apiKey: process.env.NEWSAPI_KEY }
});

export const nytAPI = axios.create({
  baseURL: 'https://api.nytimes.com/svc/search/v2',
  params: { 'api-key': process.env.NYTIMES_KEY }
});

export const gnewsAPI = axios.create({
  baseURL: 'https://gnews.io/api/v4',
  params: { apikey: process.env.GNEWS_KEY }
});

newsAPI.interceptors.request.use(config => {
    console.log('NewsAPI Request:', config.url);
    return config;
  });
  
  nytAPI.interceptors.request.use(config => {
    console.log('NYTimes Request:', config.url);
    return config;
  });