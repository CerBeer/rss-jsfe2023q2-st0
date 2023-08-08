
const burgerButtonOpen = document.querySelector('.header-burger-icon');
const burgerMenu = document.querySelector('.header-burger-menu');

function burgerMenuOpen(e) {
    //#removing
    //console.log(e);
    e.stopPropagation();
    if (!burgerMenu.classList.contains('header-burger-menu-active')) {
        //#removing
        //const target = e.target;
        //const burgerButtonClose = document.querySelector('.header-burger-menu-icon');
        //const burgerMenuList = document.querySelector('.header-burger-menu-list');
        //const its_burgerButtonClose = target == burgerButtonClose;
        //const its_burgerMenuList = target == burgerMenuList || burgerMenuList.contains(target);
        document.addEventListener('click', burgerMenuClose);
        burgerMenu.classList.add('header-burger-menu-active');
    }
}

function burgerMenuClose(e) {
    //#removing
    //console.log(e);
    if (burgerMenu.classList.contains('header-burger-menu-active')) {
        document.removeEventListener('click', burgerMenuClose);
        burgerMenu.classList.remove('header-burger-menu-active');
    }
}

burgerButtonOpen.addEventListener('click', burgerMenuOpen);

//#removing
let self_esteem = 'Самооценка работы: 50 баллов \n \
- Вёрстка соответствует макету. Ширина экрана 768px +26 \n \
- Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12 \n \
- На ширине экрана 768рх реализовано адаптивное меню +12'
console.log(self_esteem);