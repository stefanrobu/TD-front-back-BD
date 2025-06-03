import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:xxxx', // <- aici setezi adresa API
  withCredentials: true, // opțional, dacă ai cookies/session
});

export default api;
