
    const burgerButtonOpen = document.querySelector('.header-burger-button-open');
    const burgerMenu = document.querySelector('.header-nav');

    const profileMenuButton = document.querySelector('.header-profile-icon');
    const profileMenu = document.querySelector('.header-profile-drop-menu-profile');
    const profileMenuLoggedOut = document.querySelector('.header-profile-drop-menu-profile-menu-logged-out');
    const profileMenuLoggedIn = document.querySelector('.header-profile-drop-menu-profile-menu-logged-in');

    function burgerMenuClickOpen(e) {
        e.stopPropagation();
        profileMenuClose();
        if (!profileMenu.classList.contains('header-profile-drop-menu-profile-menu-display-none')) {
            profileMenu.classList.add('header-profile-drop-menu-profile-menu-display-none');
        }
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

    function profileMenuClickOpen(e) {
        e.stopPropagation();
        burgerMenuClose();
        if (profileMenu.classList.contains('header-profile-drop-menu-profile-menu-display-none')) {
            profileMenu.classList.toggle('header-profile-drop-menu-profile-menu-display-none');
            document.addEventListener('click', profileMenuClickClose);
        } else {
            profileMenuClose()
        }
    }

    function profileMenuClickClose(e) {
        const target = e.target;
        const its_profileMenu = target == profileMenu;
        if (!its_profileMenu) {
            profileMenuClose();
        }
    }

    function profileMenuClose() {
        if (!profileMenu.classList.contains('header-profile-drop-menu-profile-menu-display-none')) {
            document.removeEventListener('click', profileMenuClickClose);
            profileMenu.classList.add('header-profile-drop-menu-profile-menu-display-none');
        }
    }

    burgerButtonOpen.addEventListener('click', burgerMenuClickOpen);

    profileMenuButton.addEventListener('click', profileMenuClickOpen);
