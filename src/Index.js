import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// ✅ Make sure this matches the ID in your index.html (you said it's "app")
const container = document.getElementById('app');

if (!container) {
  throw new Error("No element with id 'app' found in index.html");
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      (reg) => console.log('✅ Service Worker registered:', reg.scope),
      (err) => console.error('❌ Service Worker registration failed:', err)
    );
  });
}
