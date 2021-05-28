'use strict'


import { GeneratePreloader } from './content.js';
import { MainPage, NotFoundPage, PostsPage } from './pages.js';

let prevPage = '';
const routes = new Map();

export const AddRoutes = (paths = []) => paths.forEach(({ path, fn }) => routes.set(path, fn));

export const InitRoutes = () => AddRoutes([
    { 'path': '/', 'fn': MainPage },
    { 'path': /\d+/, 'fn': PostsPage },
    { 'path': '/404', 'fn': NotFoundPage }
]);

// handle back and forward btn
window.onpopstate = e => Route(e.state);

// routes
export const Route = URL => {
    if (URL === prevPage) return;
    prevPage = URL;
    history.pushState(URL, '', URL);
    GeneratePreloader(document.querySelector('.content'));

    const fn = routes.get(URL)
    if (path instanceof RegExp && path.test(URL)) return fn();
    if (path === URL) return fn();
    return routes.get('/404')();
}