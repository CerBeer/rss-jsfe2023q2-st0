
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
let self_esteem = 'Самооценка работы: 100 баллов \n \
- Вёрстка валидная +10 \n \
- Вёрстка семантическая +16 \n \
- Вёрстка соответствует макету +54 \n \
- Общие требования к верстке +20'
console.log(self_esteem);