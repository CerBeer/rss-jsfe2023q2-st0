
// modal window splash message
function modal_windows_splash(owner, message) {
    const new_div = document.createElement('div');
    new_div.innerHTML = message;
    new_div.classList.add('splash-message');
    owner.append(new_div);
    setTimeout(() => {new_div.remove();}, 2000);
}

function tooltip_splash(owner, message) {
    const new_div = document.createElement('div');
    new_div.innerHTML = message;
    new_div.classList.add('splash-message');

    let x = owner.offsetLeft + 10;
    let y = owner.offsetTop - 10;
    new_div.style.left = x + "px";
    new_div.style.top = y + "px";
    new_div.style.color = '#888';
    new_div.style.width = 'auto';

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
        // profileMenuButton_LogIn.click();
        loginUser(user.email);
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


// modal window my profile

function modalWindow_myProfile_setStateView() {
    //console.log(`'${authorizedUser}'`);
    if (authorizedUser === '') return;
    
    user = getRegisteredUserByLogin(authorizedUser);
    modal_window_profile_usericon.innerText = userInitials(user);
    modal_window_profile_username.innerText = userFullNameWithHyphenation(user, 10);
    modal_window_profile_visits.innerText = userVisits(user);
    modal_window_profile_bonuses.innerText = userBonuses(user);
    modal_window_profile_books.innerText = userBooks_count(user);
    modal_window_profile_cardnumber.innerText = userLibraryCard(user);

    let books = userBooks(user);
    let booksList = '';
    for (let bookId of books) {
        book = listOfBooks.get(bookId);
        booksList = `${booksList}\n<li class="modal-windows-window-profile-right-rentedbooks-listbooks-item">${book.name}, ${book.author}`;
    }
    modal_window_profile_listbooks.innerHTML = booksList;
}

function modalWindow_myProfile_copyLibraryCardToClipboard() {
    navigator.clipboard.writeText(userLibraryCardByLogin(authorizedUser))
    .then(() => {
        tooltip_splash(modal_window_button_copyLibraryCardToClipboard, 'Success');
        console.log('Success');
    })
    .catch(err => {
        tooltip_splash(document.querySelector('.modal-windows-window-profile-right-cardnumber'), 'Something went wrong');
        console.log('Something went wrong', err);
    });
}

const modal_window_profile_usericon = document.querySelector('.modal-windows-window-profile-left-usericon');
const modal_window_profile_username = document.querySelector('.modal-windows-window-profile-left-username');
const modal_window_profile_visits = document.querySelector('.modal-windows-window-profile-right-cardsprofile-column-count-visits');
const modal_window_profile_bonuses = document.querySelector('.modal-windows-window-profile-right-cardsprofile-column-count-bonuses');
const modal_window_profile_books = document.querySelector('.modal-windows-window-profile-right-cardsprofile-column-count-books');
const modal_window_profile_listbooks = document.querySelector('.modal-windows-window-profile-right-rentedbooks-listbooks');
const modal_window_profile_cardnumber = document.querySelector('.modal-windows-window-profile-right-cardnumber-cardnumber');
const modal_window_button_copyLibraryCardToClipboard = document.querySelector('.modal-windows-window-profile-right-cardnumber-copy');

modal_window_button_copyLibraryCardToClipboard.addEventListener('click', modalWindow_myProfile_copyLibraryCardToClipboard);
