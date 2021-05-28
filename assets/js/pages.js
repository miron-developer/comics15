'use strict'

import { RemovePreloader, WriteContent, ContentHeader } from './content.js';
import { Route } from './router.js';
import { GetDataByID } from './api.js';

const addCSS = (...links) => {
    const haveLinks = Array.from(document.querySelectorAll('link'));
    links.forEach(flink => {
        const isHave = haveLinks.find(link => link.href.split('/')[5] === flink + ".css");
        if (!isHave) document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="/assets/css/${flink}.css">`);
    });
}

export const NotFoundPage = async() => {
    console.log('not found page');
    WriteContent(ContentHeader, '404');
    WriteContent(undefined, '<h2 class="NF-h2"> Omaeva mou shindeiru </h2>');
    RemovePreloader();
}

export const ComicsPage = async() => {
    console.log('comics page');
    addCSS('comics');

    const comicsID = window.location.pathname.split('/')[1]
    const data = await GetDataByID(comicsID, 'comics');
    console.log(data);
    // if (data.err != "ok") return Route('/nf404');
    RemovePreloader();
}