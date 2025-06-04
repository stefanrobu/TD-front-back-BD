import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // stilurile globale, inclusiv Tailwind
import App from './App';  // componenta principală a aplicației
import reportWebVitals from './reportWebVitals';  // pentru măsurare performanță (opțional)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// pentru măsurarea performanței poți loga rezultatele sau trimite la un serviciu analitic
reportWebVitals();
