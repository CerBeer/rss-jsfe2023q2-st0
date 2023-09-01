function modal_windows_register_button_action(e) {

    // e.stopPropagation();
    e.preventDefault();
    let user = getEmptyUser();
    user.firstName = document.querySelector('#modal-windows-window-register-firstname').value;
    user.lastName = document.querySelector('#modal-windows-window-register-lastname').value;
    user.email = document.querySelector('#modal-windows-window-register-e-mail').value;
    user.password = document.querySelector('#modal-windows-window-register-password').value;
    if (userCanRegister(user)) {
        registerUser(user);
        profileMenuButton_LogIn.click();
    }
    return false;
}

function modal_windows_login_button_action(e) {
    
    e.preventDefault();
    userLogin = document.querySelector('#modal-windows-window-login-e-mail').value;
    userPassword = document.querySelector('#modal-windows-window-login-password').value;
    if (userCanLogin(userLogin, userPassword)) {
        authorizeUser(userLogin);
        profileMenuClick_action_login_Close_Close();
        setStateView();
        //profileMenuButton_MyProfile.click();
    }
    return false;
}

const modal_windows_register_button = document.querySelector('.modal-windows-register-button');
modal_windows_register_button.addEventListener('click', modal_windows_register_button_action);

const modal_windows_login_button = document.querySelector('.modal-windows-login-button');
modal_windows_login_button.addEventListener('click', modal_windows_login_button_action);


// profile menu click buy a library card
function modal_windows_buyer_open() {
    modal_windows_buyer.classList.remove('modal-windows-none');
    document.body.classList.add('modal-windows-open');
    document.addEventListener('mousedown', modal_windows_buyer_Close);
}

function modal_windows_buyer_Close(e) {
    const target = e.target;
    const its_modal_windows_buyer = (target == modal_windows_buyer || target == modal_windows_buyer_closebtn || modal_windows_buyer_closebtn.contains(target));
    if (its_modal_windows_buyer) {
        modal_windows_buyer_Close_Close();
    }
}

function modal_windows_buyer_Close_Close() {
    modal_windows_buyer.classList.add('modal-windows-none');
    document.body.classList.remove('modal-windows-open');
    document.removeEventListener('mousedown', modal_windows_buyer_Close);
}

function modal_windows_buyer_closebtn_click(e) {
    logoutUser();
    setStateView();
}

const modal_windows_buyer = document.querySelector('.modal-windows-bayer');
const modal_windows_buyer_closebtn = document.querySelector('.modal-windows-window-bayer-closebtn');
