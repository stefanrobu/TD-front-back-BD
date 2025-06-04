import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7201', // <- aici setezi adresa API
  withCredentials: true, // opțional, dacă ai cookies/session
});

export default api;
