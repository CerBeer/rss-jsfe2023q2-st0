let self_esteem = 'Самооценка работы: 100 баллов \n \
- Вёрстка валидная +10 \n \
- Вёрстка семантическая +16 \n \
- Вёрстка соответствует макету +54 \n \
- Общие требования к верстке +20'
console.log(self_esteem);

(function () {
    const burgerOpen = document.querySelector('.header-burger-icon');
    burgerOpen.addEventListener('click', () => {
        const burgerMenu = document.querySelector('.header-burger-menu');
        burgerMenu.classList.add('header-burger-menu-active');
    });
    const burgerClose = document.querySelector('.header-burger-menu-icon');
    burgerClose.addEventListener('click', () => {
        const burgerMenu = document.querySelector('.header-burger-menu');
        burgerMenu.classList.remove('header-burger-menu-active');
    });
}());