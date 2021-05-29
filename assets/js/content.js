'use strict'

import { Route } from "./router.js";


export const ContentHeader = document.querySelector('.content-header');
export const ContentBody = document.querySelector('.content-body');

export const CleanContent = whatClear => whatClear.innerHTML = '';
export const WriteContent = (insertHtml = '', where = ContentBody) => {
    CleanContent(where);
    where.insertAdjacentHTML('beforeend', insertHtml);
}

export const RemovePreloader = () => document.querySelector('.preloader').remove();
export const GeneratePreloader = whereToPlace => {
    whereToPlace.insertAdjacentHTML('beforeend', `<div class="preloader">
                                                    <div class="circle circle-1"></div>
                                                    <div class="circle circle-2"></div>
                                                    <div class="circle circle-3"></div>
                                                    <div class="circle circle-4"></div>
                                                    <div class="circle circle-5"></div>
                                                    <div class="circle circle-6"></div>
                                                    <div class="circle circle-7"></div>
                                                    <div class="circle circle-8"></div>
                                                </div>`);
}

export function Debounce(fn, time) {
    let timeOut;
    return async(...args) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(async() => { await fn(...args) }, time - 1)
    }
}

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

export const GetDate = (y, m, d) => {
    return [d ? d : '1', m ? months[m] : 'Jan', y ? y : '2000'].join(' ');
}

export const FillComicsData = (comicsData) => {
    if (!comicsData) return Route('/nf');
    document.querySelector('.comics-img img').setAttribute('src', comicsData.img);
    document.querySelector('.comics-img img').setAttribute('alt', comicsData.alt);
    document.querySelector('.comics-date').textContent = GetDate(comicsData.year, comicsData.month, comicsData.day);
    document.querySelector('.comics-transcript').textContent = comicsData.transcript;
}