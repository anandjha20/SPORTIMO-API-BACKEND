import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

  // axios.defaults.baseURL = 'http://localhost:3600';
  // axios.defaults.baseURL = 'http://192.168.1.95:3600';
    axios.defaults.baseURL = "http://100.26.5.179:3000";
// const token = localStorage.getItem("token")
// axios.defaults.headers.common['token'] = `${token}`;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

