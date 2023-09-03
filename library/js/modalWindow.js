
// modal window splash message
function modal_windows_splash(owner, message) {
    const new_div = document.createElement('div');
    new_div.innerHTML = message;
    new_div.classList.add('splash-message');
    owner.append(new_div);
    setTimeout(() => {new_div.remove();}, 2000);
}

function tooltip_splash(owner, message, addCSS) {
    const new_div = document.createElement('div');
    new_div.innerHTML = message;
    new_div.classList.add('tooltip-message');

    let x = owner.offsetLeft;
    let y = owner.offsetTop;
    new_div.style.left = x + "px";
    new_div.style.top = y + "px";
    
    new_div.style.cssText = new_div.style.cssText + addCSS;

    owner.append(new_div);
    setTimeout(() => {new_div.remove();}, 1600);
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


// modal window my profile

function modalWindow_myProfile_setStateView() {

    if (authorizedUser === '') return;
    
    let user = getRegisteredUserByLogin(authorizedUser);
    modal_window_profile_usericon.innerText = userInitials(user);
    modal_window_profile_username.innerText = userFullNameWithHyphenation(user, 10);
    modal_window_profile_visits.innerText = userVisits(user);
    modal_window_profile_bonuses.innerText = userBonuses(user);
    modal_window_profile_books.innerText = userBooks_count(user);
    modal_window_profile_cardnumber.innerText = userLibraryCard(user);

    let books = userBooks(user);
    let booksList = '';
    for (let bookid of books) {
        book = listOfBooks[bookid];
        booksList = `${booksList}\n<li class="modal-windows-window-profile-right-rentedbooks-listbooks-item">${book.name}, ${book.author}`;
    }
    modal_window_profile_listbooks.innerHTML = booksList;
}

function modalWindow_myProfile_copyLibraryCardToClipboard(e) {
    navigator.clipboard.writeText(userLibraryCardByLogin(authorizedUser))
    .then(() => {
        tooltip_splash(modal_window_button_copyLibraryCardToClipboard, 'Success', 'transform: translate(20px, 6px);');
    })
    .catch(err => {
        tooltip_splash(modal_window_button_copyLibraryCardToClipboard, 'Something went wrong');
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


// modal window buy a library card

function modal_windows_buyer_open(bookid) {
    if (!userOwnBookByLogin(authorizedUser, bookid)) {
        modal_window_buyer_button_buy.dataset.bookid = bookid;
        fillFieldsSavedUserPayment(getRegisteredUserByLogin(authorizedUser));
        modal_window_buyer.classList.remove('modal-windows-none');
        document.body.classList.add('modal-windows-open');
        document.addEventListener('mousedown', modal_windows_buyer_Close);
    }
}

function modal_windows_buyer_Close(e) {
    const target = e.target;
    const its_modal_windows_buyer = (target == modal_window_buyer || target == modal_window_buyer_closebtn || modal_window_buyer_closebtn.contains(target));
    if (its_modal_windows_buyer) {
        modal_windows_buyer_Close_Close();
    }
}

function modal_windows_buyer_Close_Close() {
    modal_window_buyer.classList.add('modal-windows-none');
    document.body.classList.remove('modal-windows-open');
    document.removeEventListener('mousedown', modal_windows_buyer_Close);
    favorites_book_ownership_setStateView();
}

function modalWindow_buyer_setStateView() {
}

function modalWindow_buyer_buy(e) {
    if (allFieldsFilledInCorrectly()) {
        let bookid = modal_window_buyer_button_buy.dataset.bookid;
        if (!userOwnBookByLogin(authorizedUser, bookid)) {
            let user = getRegisteredUserByLogin(authorizedUser);
            fillUserPaymentFields(user);
            userAddBooksOwn(user, bookid);
            saveUser(user);
            tooltip_splash(modal_window_buyer_button_buy, 'Book bought', 'transform: translate(0, 40px); color: green;');
            setTimeout(() => {modal_windows_buyer_Close_Close();}, 1000);
        } else {
            tooltip_splash(modal_window_buyer_button_buy, 'You are alredy owned it', 'transform: translate(0, 40px); color: red;');
            setTimeout(() => {modal_windows_buyer_Close_Close();}, 1000);
        }
    } else {
        tooltip_splash(modal_window_buyer_button_buy, 'Not all fields are filled correctly', 'transform: translate(0, 40px); color: red;');
    }
}

function allFieldsFilledInCorrectly() {

    let allFieldsFilled = true;
    for (let field of modal_window_buyer_form) {

        const {name} = field;
        if (name) {
            const {type, checked, value} = field;
            data = ['checkbox', 'radio'].includes(type) ? true : value;
            allFieldsFilled = allFieldsFilled && data.length > 0;
        }
    }

    return allFieldsFilled;
}

function fillUserPaymentFields(user) {

    for (let field of modal_window_buyer_form) {

        const {name} = field;
        if (name) {
            const {type, checked, value} = field;
            user[name] = ['checkbox', 'radio'].includes(type) ? checked : value;
        }
    }

    return user;
}

function fillFieldsSavedUserPayment(user) {

    for (let field of modal_window_buyer_form) {

        const {name} = field;
        if (name) {
            field.value = user[name];
        }
    }
}

const modal_window_buyer = document.querySelector('.modal-windows-bayer');
const modal_window_buyer_closebtn = document.querySelector('.modal-windows-window-bayer-closebtn');
const modal_window_buyer_button_buy = document.querySelector('.modal-windows-buyer-button');
const modal_window_buyer_form = document.querySelector('.modal-windows-window-body-buyer-left');

modal_window_buyer_button_buy.addEventListener('click', modalWindow_buyer_buy);
