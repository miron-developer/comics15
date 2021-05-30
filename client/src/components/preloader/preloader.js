import './preloader.css';

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