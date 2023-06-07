import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Utils/Router';
import history from './Utils/History';
import App from './App';
import "./index.css";

createRoot(document.getElementById('root'))
  .render(
    <Router history={history}>
      <App />
    </Router>
  );