'use strict'


import { GeneratePreloader, ContentElem } from './content.js';
import { ComicsPage, NotFoundPage } from './pages.js';

let prevPage = '';
const routes = new Map();

export const AddRoutes = (paths = []) => paths.forEach(({ path, fn }) => routes.set(path, fn));

export const InitRoutes = () => AddRoutes([
    { 'path': /^\/\d+$/, 'fn': ComicsPage },
    { 'path': '/nf', 'fn': NotFoundPage }
]);

// handle back and forward btn
window.onpopstate = e => Route(e.state);

const render = (URL) => {
    prevPage = URL;
    history.pushState(URL, '', URL);
    GeneratePreloader(ContentElem);
}

// routes
export const Route = URL => {
    if (URL === prevPage) return;
    if (URL === "/") return Route('/1');

    for (let [path, fn] of routes) {
        if ((path instanceof RegExp && path.test(URL)) || path === URL) {
            return render(URL) || fn();
        }
    }
    return Route('/nf');
}