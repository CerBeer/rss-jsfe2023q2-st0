
function modal_windows_window_closebtn(e) {
    profileMenuClick_action_register_Close_Close();
    profileMenuClick_action_login_Close_Close();
}

// profile menu click login
function profileMenuClick_action_login(e) {
    e.stopPropagation();
    profileMenuClose();
    profileMenuClick_action_register_Close_Close();
    profileMenuClick_action_login_open();
}

function profileMenuClick_action_login_open() {
    modal_windows_login.classList.remove('modal-windows-none');
    document.body.classList.add('modal-windows-open');
    document.addEventListener('mousedown', profileMenuClick_action_login_Close);
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
    document.removeEventListener('mousedown', profileMenuClick_action_login_Close);
}

// profile menu click register    
function profileMenuClick_action_register(e) {
    e.stopPropagation();
    profileMenuClose();
    profileMenuClick_action_login_Close_Close();
    modal_windows_register.classList.remove('modal-windows-none');
    document.body.classList.add('modal-windows-open');
    document.addEventListener('mousedown', profileMenuClick_action_register_Close);
}

function profileMenuClick_action_register_Close(e) {
    const target = e.target;
    const its_modal_windows_register = target == modal_windows_register;
    if (its_modal_windows_register) {
        profileMenuClick_action_register_Close_Close();
    }
}

function profileMenuClick_action_register_Close_Close() {
    modal_windows_register.classList.add('modal-windows-none');
    document.body.classList.remove('modal-windows-open');
    document.removeEventListener('mousedown', profileMenuClick_action_register_Close);
}

// profile menu click my profile
function profileMenuClick_action_myProfile(e) {
    e.stopPropagation();
    profileMenuClose();
    profileMenuClick_action_login_Close_Close();
    modal_windows_profile.classList.remove('modal-windows-none');
    document.body.classList.add('modal-windows-open');
    document.addEventListener('mousedown', profileMenuClick_action_myProfile_Close);
}

function profileMenuClick_action_myProfile_Close(e) {
    const target = e.target;
    const its_modal_windows_myProfile = (target == modal_windows_profile || target == modal_windows_profile_closebtn || modal_windows_profile_closebtn.contains(target));
    if (its_modal_windows_myProfile) {
        profileMenuClick_action_myProfile_Close_Close();
    }
}

function profileMenuClick_action_myProfile_Close_Close() {
    modal_windows_profile.classList.add('modal-windows-none');
    document.body.classList.remove('modal-windows-open');
    document.removeEventListener('mousedown', profileMenuClick_action_myProfile_Close);
}

function profileMenuClick_action_LogOut(e) {
    profileMenuClose();
    logoutUser();
    setStateView();
}


const profileMenuButton_LogIn = document.querySelector('.header-profile-drop-menu-profile-menu-login');
const profileMenuButton_Register = document.querySelector('.header-profile-drop-menu-profile-menu-register');
const profileMenuButton_MyProfile = document.querySelector('.header-profile-drop-menu-profile-menu-myprofile');
const profileMenuButton_LogOut = document.querySelector('.header-profile-drop-menu-profile-menu-logout');

const modal_windows_login_linkregister = document.querySelector('.modal-windows-login-linkregister');
const modal_windows_register_linklogin = document.querySelector('.modal-windows-register-linklogin');

const modal_windows_login = document.querySelector('.modal-windows-login');
const modal_windows_login_closebtn = document.querySelector('.modal-windows-window-login-closebtn');
const modal_windows_register = document.querySelector('.modal-windows-register');
const modal_windows_register_closebtn = document.querySelector('.modal-windows-window-register-closebtn');
const modal_windows_profile = document.querySelector('.modal-windows-profile');
const modal_windows_profile_closebtn = document.querySelector('.modal-windows-window-profile-closebtn');


profileMenuButton_LogIn.addEventListener('click', profileMenuClick_action_login);
modal_windows_login_closebtn.addEventListener('click', modal_windows_window_closebtn);
profileMenuButton_Register.addEventListener('click', profileMenuClick_action_register);
modal_windows_register_closebtn.addEventListener('click', modal_windows_window_closebtn);
profileMenuButton_MyProfile.addEventListener('click', profileMenuClick_action_myProfile);
profileMenuButton_LogOut.addEventListener('click', profileMenuClick_action_LogOut);

modal_windows_login_linkregister.addEventListener('click', profileMenuClick_action_register);
modal_windows_register_linklogin.addEventListener('click', profileMenuClick_action_login);
