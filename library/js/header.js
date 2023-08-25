
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

    function burgerMenuClose() {
        if (burgerMenu.classList.contains('header-burger-menu-active')) {
            document.removeEventListener('click', burgerMenuClickClose);
            burgerMenu.classList.remove('header-burger-menu-active');
        }
    }

    burgerButtonOpen.addEventListener('click', burgerMenuClickOpen);

