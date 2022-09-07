import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

//axios.defaults.baseURL = 'http://192.168.1.95:3600';
 axios.defaults.baseURL = "http://34.204.253.168:3000";

// const token = localStorage.getItem("token")
// axios.defaults.headers.common['token'] = `${token}`;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

