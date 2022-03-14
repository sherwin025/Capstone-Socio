import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Socio } from './components/Socio';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Socio />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);