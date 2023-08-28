
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

    function profileMenuClick_action_login(e) {
        e.stopPropagation();
        profileMenuClose();
        modal_windows_login.classList.remove('modal-windows-none');
        document.body.classList.add('modal-windows-open');
        document.addEventListener('click', profileMenuClick_action_login_Close);
    }

    function profileMenuClick_action_login_Close(e) {
        const target = e.target;
        const its_modal_windows_login = target == modal_windows_login;
        if (its_modal_windows_login) {
            profileMenuClick_action_login_Close_Close();
        }
    }

    function profileMenuClick_action_login_Close_Close() {
        modal_windows_login.classList.add('modal-windows-none');
        document.body.classList.remove('modal-windows-open');
        document.removeEventListener('click', profileMenuClick_action_login_Close);
    }

    function profileMenuClick_action(e) {
        //        console.log(e.target);
    }
        
    const burgerButton_Open = document.querySelector('.header-burger-button-open');
    const burgerMenu = document.querySelector('.header-nav');

    const profileMenuButton_Open = document.querySelector('.header-profile-icon');
    const profileMenu = document.querySelector('.header-profile-drop-menu-profile');
    const profileMenuLoggedOut = document.querySelector('.header-profile-drop-menu-profile-menu-logged-out');
    const profileMenuLoggedIn = document.querySelector('.header-profile-drop-menu-profile-menu-logged-in');

    const profileMenuButton_LogIn = document.querySelector('.header-profile-drop-menu-profile-menu-login');
    const profileMenuButton_Register = document.querySelector('.header-profile-drop-menu-profile-menu-register');
    const profileMenuButton_MyProfile = document.querySelector('.header-profile-drop-menu-profile-menu-myprofile');
    const profileMenuButton_LogOut = document.querySelector('.header-profile-drop-menu-profile-menu-logout');

    const modal_windows_login = document.querySelector('.modal-windows-login');

    burgerButton_Open.addEventListener('click', burgerMenuClickOpen);

    profileMenuButton_Open.addEventListener('click', profileMenuClickOpen);

    profileMenuButton_LogIn.addEventListener('click', profileMenuClick_action_login);
    profileMenuButton_Register.addEventListener('click', profileMenuClick_action);
    profileMenuButton_MyProfile.addEventListener('click', profileMenuClick_action);
    profileMenuButton_LogOut.addEventListener('click', profileMenuClick_action);
