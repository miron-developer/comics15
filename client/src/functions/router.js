import { ContentElem } from './content.js';
import { GeneratePreloader } from '../components/preloader/preloader';
import NFPage from '../components/nf/nf';
import ComicsPage from '../components/comics/comics';

let prevPage = '';
const routes = new Map();

export const AddRoutes = (paths = []) => paths.forEach(({ path, fn }) => routes.set(path, fn));

export const InitRoutes = () => AddRoutes([
    { 'path': /^\/\d+$/, 'fn': ComicsPage },
    { 'path': '/nf', 'fn': NFPage }
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