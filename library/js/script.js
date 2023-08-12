
const burgerButtonOpen = document.querySelector('.header-burger-icon');
const burgerMenu = document.querySelector('.header-burger-menu');

function burgerMenuOpen(e) {
    e.stopPropagation();
    if (!burgerMenu.classList.contains('header-burger-menu-active')) {
        document.addEventListener('click', burgerMenuClose);
        burgerMenu.classList.add('header-burger-menu-active');
    }
}

function burgerMenuClose(e) {
    const target = e.target;
    //const its_burgerMenu = target == burgerMenu || burgerMenu.contains(target);
    const its_burgerMenu = target == burgerMenu;
    if (!its_burgerMenu) {
        if (burgerMenu.classList.contains('header-burger-menu-active')) {
            document.removeEventListener('click', burgerMenuClose);
            burgerMenu.classList.remove('header-burger-menu-active');
        }
    }
}

burgerButtonOpen.addEventListener('click', burgerMenuOpen);

let self_esteem = 'Самооценка работы: 50 баллов \n \
- Вёрстка соответствует макету. Ширина экрана 768px +26 \n \
- Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12 \n \
- На ширине экрана 768рх реализовано адаптивное меню +12'
console.log(self_esteem);

const footerLeftYear = document.querySelector('.find-offset-width');
function talkOffset(e) {
    let docWidth = document.documentElement.offsetWidth;
    console.log('Document width: ' + docWidth);
    [].forEach.call(
        document.querySelectorAll('*'),
        function(el) {
        if (el.offsetWidth > docWidth) {
            console.log(el);
        }
    }
)};
footerLeftYear.addEventListener('click', talkOffset);
