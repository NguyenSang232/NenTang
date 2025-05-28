// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; // <--- DÒNG NÀY RẤT QUAN TRỌNG!
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Bao bọc App/Login bằng BrowserRouter nếu bạn dùng router */}
      <App /> {/* Hoặc <Login /> */}
    </BrowserRouter>
  </React.StrictMode>,
);
