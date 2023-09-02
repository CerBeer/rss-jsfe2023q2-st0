
// modal window splash message
function modal_windows_splash(owner, message) {
    const new_div = document.createElement('div');
    new_div.innerHTML = message;
    new_div.classList.add('splash-message');
    owner.append(new_div);
    setTimeout(() => {new_div.remove();}, 2000);
}

// modal window register
function modal_windows_register_button_action(e) {

    // e.stopPropagation();
    // e.preventDefault();
    let user = getEmptyUser();
    user.firstName = document.querySelector('#modal-windows-window-register-firstname').value;
    user.lastName = document.querySelector('#modal-windows-window-register-lastname').value;
    user.email = document.querySelector('#modal-windows-window-register-e-mail').value;
    user.password = document.querySelector('#modal-windows-window-register-password').value;
    const isUserCanRegister = userCanRegister(user);
    if (!isUserCanRegister.err) {
        registerUser(user);
        profileMenuButton_LogIn.click();
    } else {
        if (isUserCanRegister.message.length > 0)
            modal_windows_splash(modal_windows_window_register, isUserCanRegister.message);
    }
}

const modal_windows_window_register = document.querySelector('.modal-windows-window-register');
const modal_windows_register_button = document.querySelector('.modal-windows-register-button');
modal_windows_register_button.addEventListener('click', modal_windows_register_button_action);

// modal window login
function modal_windows_login_button_action(e) {
    
    userLogin = document.querySelector('#modal-windows-window-login-e-mail').value;
    userPassword = document.querySelector('#modal-windows-window-login-password').value;
    if (userLogin.length * userPassword.length > 0) {
        if (userCanLogin(userLogin, userPassword)) {
        loginUser(userLogin);
        profileMenuClick_action_login_Close_Close();
        } else {
            modal_windows_splash(modal_windows_window_login, "Incorrect login or password!");
        }
    }
}

const modal_windows_window_login = document.querySelector('.modal-windows-window-login');
const modal_windows_login_button = document.querySelector('.modal-windows-login-button');
modal_windows_login_button.addEventListener('click', modal_windows_login_button_action);


// modal window buy a library card
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
