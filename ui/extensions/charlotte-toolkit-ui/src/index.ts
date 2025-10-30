// src/index.ts

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';

// Import Falcon Shoelace CSS (CrowdStrike themed Shoelace components)
// This includes falcon-styles and provides light/dark theme support
import '@crowdstrike/falcon-shoelace/dist/style.css';

// Import regular Shoelace for component functionality
import '@shoelace-style/shoelace/dist/shoelace.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

// Import minimal custom styles LAST (only for component-specific overrides)
import './styles/global.css';

// Set the base path for Shoelace icons to CDN
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/');

// Theme switching utility - system preferences only (no localStorage in sandbox)
const initializeTheme = () => {
  // Simple system preference detection
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (prefersDark) {
    document.documentElement.classList.add('theme-dark');
  } else {
    document.documentElement.classList.remove('theme-dark');
  }

  // Listen for system theme changes and update automatically
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
      document.documentElement.classList.add('theme-dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
    }
  });
};

// Initialize theme before rendering
initializeTheme();

// Render the app
const container = document.querySelector('#app');
if (!container) {
  throw new Error('Could not find app container element');
}

const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
