// ✅ src/api/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api' // ✅ et NON pas '/api/api'
});

export default instance;
