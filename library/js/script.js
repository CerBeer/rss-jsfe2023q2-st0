
// #section-start burger-menu

    const burgerButtonOpen = document.querySelector('.header-burger-button-open');
    const burgerMenu = document.querySelector('.header-nav');

    function burgerMenuClickOpen(e) {
        e.stopPropagation();
        if (!burgerMenu.classList.contains('header-nav-slow-mo')) {
            burgerMenu.classList.add('header-nav-slow-mo');
        }
        if (!burgerMenu.classList.contains('header-burger-menu-active')) {
            document.addEventListener('click', burgerMenuClickClose);
            burgerMenu.classList.add('header-burger-menu-active');
        }
    }

    function burgerMenuClickClose(e) {
        const target = e.target;
        //const its_burgerMenu = target == burgerMenu || burgerMenu.contains(target);
        const its_burgerMenu = target == burgerMenu;
        if (!its_burgerMenu) {
            burgerMenuClose();
        }
    }

    window.addEventListener('resize', function(event) {
        burgerMenuClose();
        let docWidth = document.documentElement.offsetWidth;
        if ((docWidth >= 1030) & (burgerMenu.classList.contains('header-nav-slow-mo'))) {
            burgerMenu.classList.remove('header-nav-slow-mo');
        }
    }, true);

    window.addEventListener('scroll', function(event) {
        burgerMenuClose();
    });


    function burgerMenuClose() {
        if (burgerMenu.classList.contains('header-burger-menu-active')) {
            document.removeEventListener('click', burgerMenuClickClose);
            burgerMenu.classList.remove('header-burger-menu-active');
        }
    }

    burgerButtonOpen.addEventListener('click', burgerMenuClickOpen);

// #section-end burger-menu

// #section-start self-esteemate

    let self_esteem = 'Самооценка работы: 50 баллов \n \
    - Вёрстка соответствует макету. Ширина экрана 768px +26 \n \
    - Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12 \n \
    - На ширине экрана 768рх реализовано адаптивное меню +12'
    console.log(self_esteem);

// #section-end self-esteemate

// #section-start find-owersized-elements

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

    const findOffsetWidth = document.querySelector('.find-offset-width');
    if(findOffsetWidth === null) console.error(`Not fount selector find-offset-width`);
        else footerLeftYear.addEventListener('click', talkOffset);

// #section-end find-owersized-elements

// #section-start carousel



// #section-end carousel
