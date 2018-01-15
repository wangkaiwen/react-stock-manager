import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import $ from 'jquery'
$.baseUrl='http://www.wangkaiwen.cn/api/';
// $.baseUrl='http://localhost:18080/api/';
ReactDOM.render(
    <BrowserRouter  basename="/yuzhu">
        <App />
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
