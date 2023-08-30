
function setStateView() {
    //console.log(`'${authorizedUser}'`);
    if (authorizedUser === '') {
        document.querySelector('.header-profile-drop-menu-profile-menu-logged-out').classList.remove('header-profile-drop-menu-profile-menu-display-none');
        document.querySelector('.header-profile-drop-menu-profile-menu-logged-in').classList.add('header-profile-drop-menu-profile-menu-display-none');
    } else {
        document.querySelector('.header-profile-drop-menu-profile-menu-logged-out').classList.add('header-profile-drop-menu-profile-menu-display-none');
        document.querySelector('.header-profile-drop-menu-profile-menu-logged-in').classList.remove('header-profile-drop-menu-profile-menu-display-none');
    }

}