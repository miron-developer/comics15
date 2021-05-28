'use strict'

import { RemovePreloader, WriteContent, ContentHeader } from './content.js';


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

export const MainPage = async() => {
    console.log('main page');
    addCSS('index');
    WriteContent(ContentHeader, 'Главная');
    WriteContent(undefined, `<div class="about-anifor">
                                <h2 class="about-anifor-h2">Про форум AniFor</h2>
                                <p> Как и предыдущий <a href="https://miron-forum.herokuapp.com/" target="_blank">форум</a>, сделан на тематику японского творчества, а именно: аниме, манга и тд.</p>
                                <p> Форум сделан согласно заданию и навыками программистов</p>
                            </div>
                            <div class="top-posts">
                                <h2> Топ 10 постов по релевантности </h2>
                                <div class="posts"></div>
                            </div>`);

    RemovePreloader();
}

export const PostsPage = async() => {
    console.log('posts page');
    let currentTPPage = 1;
    addCSS('posts');
    WriteContent(ContentHeader, 'Посты')
    WriteContent(undefined, `   <div class="posts"></div>
                                ${CreatePagination()}`);
    RemovePreloader();
}