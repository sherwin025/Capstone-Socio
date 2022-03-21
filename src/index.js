import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Socio } from './components/Socio';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./index.css"
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Socio />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);