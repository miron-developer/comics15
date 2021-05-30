import { WriteContent } from '../../functions/content';

import './nf.css';

export default function NotFoundPage() {
    WriteContent(
        `<h1 class="NF-h1">404</h1>    
        <h2 class="NF-h2"> Omaeva mou shindeiru</h2>`
    );
}