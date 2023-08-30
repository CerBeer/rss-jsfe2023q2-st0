function modal_windows_register_button_action(e) {

    let user = getEmptyUser();
    user.firstName = document.querySelector('#modal-windows-window-register-firstname').value;
    user.lastName = document.querySelector('#modal-windows-window-register-lastname').value;
    user.email = document.querySelector('#modal-windows-window-register-e-mail').value;
    user.password = document.querySelector('#modal-windows-window-register-password').value;
    if (userCanRegister(user)) {
        registerUser(user);
        profileMenuButton_LogIn.click();
    }
}

function modal_windows_login_button_action(e) {
    userLogin = document.querySelector('#modal-windows-window-login-e-mail').value;
    userPassword = document.querySelector('#modal-windows-window-login-password').value;
    if (userCanLogin(userLogin, userPassword)) {
        authorizeUser(userLogin);
        profileMenuClick_action_login_Close_Close();
        setStateView();
        //profileMenuButton_MyProfile.click();
    }
}

const modal_windows_register_button = document.querySelector('.modal-windows-register-button');
modal_windows_register_button.addEventListener('click', modal_windows_register_button_action);

const modal_windows_login_button = document.querySelector('.modal-windows-login-button');
modal_windows_login_button.addEventListener('click', modal_windows_login_button_action);
