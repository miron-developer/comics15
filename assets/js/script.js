'use strict'


import { Route, InitRoutes } from './router.js';

document.addEventListener('DOMContentLoaded', async() => {
    InitRoutes();
    Route(window.location.pathname);
});