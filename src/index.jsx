import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Utils/Router';
import history from './Utils/History';
import App from './App';
import "./index.css";

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);