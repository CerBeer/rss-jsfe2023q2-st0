
"use strict";

window.addEventListener('resize', function(event) {
    burgerMenuClose();
    // let docWidth = document.documentElement.offsetWidth;
    let docWidth = document.documentElement.scrollWidth;
    if ((docWidth >= 1030) & (burgerMenu.classList.contains('header-nav-slow-mo'))) {
        burgerMenu.classList.remove('header-nav-slow-mo');
    }
    if ((docWidth >= 1430) & (about_pagination_currenIndex() > 2)) about_images_case_translateX(2);
    else if ((docWidth >= 960) & (about_pagination_currenIndex() > 3)) about_images_case_translateX(3);
    else if (docWidth < 960) about_images_case_translateX(about_pagination_currenIndex());
    // if (about_pagination_currenIndex() > 2) about_pagination_button_min.click();
}, true);

window.addEventListener('scroll', function(event) {
    burgerMenuClose();
    profileMenuClose();
});

setStateView();

console.log(generateID());

// #section-start self-esteemate

    let self_esteem = 'Самооценка работы: 50 баллов \n \
    - Вёрстка соответствует макету. Ширина экрана 768px +26 \n \
    - Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12 \n \
    - На ширине экрана 768рх реализовано адаптивное меню +12'
    console.log(self_esteem);

// #section-end self-esteemate
