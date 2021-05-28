'use strict'


export const ContentHeader = document.querySelector('.content-header');
export const ContentBody = document.querySelector('.content-body');

export const CleanContent = whatClear => whatClear.innerHTML = '';
export const WriteContent = (where = ContentBody, insertHtml = '') => {
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

let stopLoad = false;
export const ResetLoad = () => stopLoad = false;