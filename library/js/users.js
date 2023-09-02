
function registerUser(user) {
    user.cardId = generateLibraryCardNumber();
    // user.booksOwn = ['04', '08'];
    registeredUsers.set(user.email, user);
    localStorage_saveKey('registeredUsers');
}

function loginUser(userLogin) {

    authorizedUser = userLogin;
    localStorage_saveKey('authorizedUser');

    setStateView();

}

function logoutUser() {

    authorizedUser = '';
    localStorage_saveKey('authorizedUser');

    setStateView();
    
}

function userRegistered(userLogin) {

    if (!registeredUsers.has(userLogin)) return false;

    return true;
}

function userCanLogin(userLogin, userPassword) {

    if (!userRegistered(userLogin)) return false;
    
    let checkedUser = registeredUsers.get(userLogin);
    if (userPassword !== checkedUser.password) return false;

    return true;
}

function userCanRegister(user) {

    if (registeredUsers.has(user.email)) return {err: true, message: "The specified email has already been used for registration"};
    if (!passwordCanBeUsed(user.password)) return {err: true, message: ""};
    if (!eMailIsValid(user.email)) return {err: true, message: "eMail is no valid"};
    if (user.firstName.length === 0) return {err: true, message: ""};
    if (user.firstName.length > 12) return {err: true, message: ""};
    if (user.lastName.length === 0) return {err: true, message: ""};
    if (user.lastName.length > 12) return {err: true, message: ""};
    return {err: false, message: ""};
}

function passwordCanBeUsed(password) {

    let checkedPassword = password.split(' ').join('');
    if (checkedPassword.length < 1) return false;
    return true;
}

function eMailIsValid(email) {
    // const re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    const re = /^[\w-\.]+@[\w-.]+$/i; // do the check similar to the rules of the browser
    return re.test(email);
}

function getRegisteredUserByLogin(userLogin) {

    if (!registeredUsers.has(userLogin)) return getEmptyUser();
    
    let User = registeredUsers.get(userLogin);
    
    return User;
}

function userOwnBookByBookid(userLogin, bookId) {
   
    if (!registeredUsers.has(userLogin)) return false;

    let user = getRegisteredUserByLogin(userLogin);
    if (user.booksOwn.indexOf(bookId) >= 0) return true;
    
    return false;
}

function userInitials(userLogin) {

    if (!registeredUsers.has(userLogin)) return '';

    let user = getRegisteredUserByLogin(userLogin);
        
    return `${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`.toUpperCase();
}

function userFullName(userLogin) {

    if (!registeredUsers.has(userLogin)) return '';

    let user = getRegisteredUserByLogin(userLogin);
        
    return `${user.firstName} ${user.lastName}`;
}
