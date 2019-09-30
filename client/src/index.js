import React from 'react';
import { render }from 'react-dom';
import './styles/main.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';

render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'));