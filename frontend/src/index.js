import React from 'react';
import { createRoot } from 'react-dom/client';  // Import createRoot
import './styles.css';
import App from './App';

const container = document.getElementById('root');  // Get the root element
const root = createRoot(container);  // Create a root for React 18
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);