'use strict'


import { RemovePreloader, WriteContent, ContentHeader, FillComicsData } from './content.js';
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
    WriteContent('404', ContentHeader);
    WriteContent('<h2 class="NF-h2"> Omaeva mou shindeiru </h2>');
    RemovePreloader();
}

export const ComicsPage = async() => {
    addCSS('comics');

    const comicsID = window.location.pathname.split('/')[1]
    const data = await GetDataByID(comicsID, 'comics');
    if (data.err && data.err !== "ok") return Route('/nf');

    const comicsData = JSON.parse(data);
    if (Object.values(comicsData).length === 0) return Route('/nf');

    WriteContent(comicsData.safe_title, ContentHeader);
    WriteContent(
        `<div class="comics">
            <div class="comics-wrapper">
                <div class="comics-prev"></div>
                <div class="comics-next"></div>
                <div class="comics-img">
                    <img src="" alt="" />
                </div>
            </div>
            <div class="comics-info">
                <div class="comics-date"></div>
                <div class="comics-transcript"></div>
            </div>
        </div>`
    );
    FillComicsData(comicsData);
    RemovePreloader();
}