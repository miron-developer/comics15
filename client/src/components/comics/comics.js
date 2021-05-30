import { Fetching, GetDataByID } from '../../functions/api';
import { Route } from '../../functions/router';
import { WriteContent } from '../../functions/content';

import './comics.css';

const months = {
    '0': 'Jan',
    '1': 'Feb',
    '2': 'Mar',
    '3': 'Apr',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'Aug',
    '8': 'Sep',
    '9': 'Oct',
    '10': 'Nov',
    '11': 'Dec'
}

const SERVICE_URI = "https://xkcd.com/ID/info.0.json";

const getDate = (y, m, d) => {
    return [d ? d : '1', m ? months[m] : 'Jan', y ? y : '2000'].join(' ');
}

const fillComicsData = comicsData => {
    if (!comicsData) return Route('/nf');
    document.querySelector('.comics-title').textContent = comicsData.safe_title;
    document.title = "Comics 15:" + comicsData.safe_title;
    document.querySelector('.comics-img img').setAttribute('src', comicsData.img);
    document.querySelector('.comics-img img').setAttribute('alt', comicsData.alt);
    document.querySelector('.comics-date span').textContent = getDate(comicsData.year, comicsData.month, comicsData.day);
    document.querySelector('.comics-transcript span').textContent = comicsData.transcript;
}

export default async function ComicsPage() {
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
    fillComicsData(comicsData);
}