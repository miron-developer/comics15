'use strict'


import { WriteContent, FillComicsData } from './content.js';
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
    WriteContent(
        `<h1 class="NF-h1">404</h1>    
        <h2 class="NF-h2"> Omaeva mou shindeiru</h2>`
    );
}

export const ComicsPage = async() => {
    addCSS('comics');

    const comicsID = parseInt(window.location.pathname.split('/')[1]);
    const data = await GetDataByID(comicsID, 'comics');
    if (data.err && data.err !== "ok") return Route('/nf');

    const comicsData = JSON.parse(data);
    if (Object.values(comicsData).length === 0) return Route('/nf');

    WriteContent(
        `<div class="comics">
            <h2 class="comics-title"></h2>
            <div class="comics-wrapper">
                <div class="comics-img">
                    <div class="comics-btn comics-prev">&lt;</div>
                    <div class="comics-btn comics-next">&gt;</div>
                    <img src="" alt="" />
                </div>
            </div>
            <div class="comics-info">
                <div class="comics-info-item comics-date">
                    <h3 class="comics-date-title">Date:</h3>
                    <span></span>
                </div>
                <div class="comics-info-item comics-transcript">
                    <h3 class="comics-transcript-title">Transcipt:</h3>
                    <span></span>
                </div>
            </div>
        </div>`
    );

    if (comicsID > 1) document.querySelector('.comics-btn.comics-prev').addEventListener('click', () => Route(`/${comicsID-1}`))
    document.querySelector('.comics-btn.comics-next').addEventListener('click', () => Route(`/${comicsID+1}`))
    FillComicsData(comicsData);
}