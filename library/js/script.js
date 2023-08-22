
// #section-start main

"use strict";

window.addEventListener('resize', function(event) {
    burgerMenuClose();
    let docWidth = document.documentElement.offsetWidth;
    if ((docWidth >= 1030) & (burgerMenu.classList.contains('header-nav-slow-mo'))) {
        burgerMenu.classList.remove('header-nav-slow-mo');
    }
    if (about_pagination_currenIndex() > 2) about_images_case_setState(2);
}, true);

window.addEventListener('scroll', function(event) {
    burgerMenuClose();
});

// #section-end main

// #section-start self-esteemate

    let self_esteem = 'Самооценка работы: 50 баллов \n \
    - Вёрстка соответствует макету. Ширина экрана 768px +26 \n \
    - Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12 \n \
    - На ширине экрана 768рх реализовано адаптивное меню +12'
    console.log(self_esteem);

// #section-end self-esteemate
