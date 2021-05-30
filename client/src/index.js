import "regenerator-runtime/runtime.js";

import { Route, InitRoutes } from './functions/router';

import './index.css';

document.addEventListener('DOMContentLoaded', async() => {
    InitRoutes();
    Route(window.location.pathname);
});