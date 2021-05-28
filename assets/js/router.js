'use strict'


import { GeneratePreloader } from './content.js';
import { ComicsPage, NotFoundPage } from './pages.js';

let prevPage = '';
const routes = new Map();

export const AddRoutes = (paths = []) => paths.forEach(({ path, fn }) => routes.set(path, fn));

export const InitRoutes = () => AddRoutes([
    { 'path': /\d+/, 'fn': ComicsPage },
    { 'path': '/nf404', 'fn': NotFoundPage }
]);

// handle back and forward btn
window.onpopstate = e => Route(e.state);

// routes
export const Route = URL => {
    if (URL === prevPage) return;
    prevPage = URL;
    history.pushState(URL, '', URL);
    if (URL === "/") return Route('/1');

    GeneratePreloader(document.querySelector('.content'));
    for (let [path, func] of routes) {
        if (path instanceof RegExp) {
            if (path.test(URL)) return func();
            continue;
        }
        if (path === URL) return func();
    }
    return routes.get('/nf404')();
}