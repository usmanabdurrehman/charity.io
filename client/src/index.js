import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:7000'

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
