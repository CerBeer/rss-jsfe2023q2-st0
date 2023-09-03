
function registerUser(user) {
    user.libraryCard = generateLibraryCardNumber();
    user.bonuses = generateID() % 100;
    // user.booksOwn = ['04', '08'];
    registeredUsers.set(user.email, user);
    localStorage_saveKey('registeredUsers');
}

function loginUser(userLogin) {

    authorizedUser = userLogin;
    localStorage_saveKey('authorizedUser');

    let user = getRegisteredUserByLogin(userLogin);
    user.visits = (user.visits || 0) + 1;
    registeredUsers.set(user.email, user);
    localStorage_saveKey('registeredUsers');

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

    if (userRegistered(user.userLogin)) return {err: true, message: "The specified email has already been used for registration"};
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

    if (!userRegistered(userLogin)) return getEmptyUser();
    
    let User = registeredUsers.get(userLogin);
    
    return User;
}

// ToDo: to correct
function libraryCardRegistered(libraryCard) {

    if (!registeredUsers.has(libraryCard)) return false;

    return true;
}

function getRegisteredUserByLibraryCard(libraryCard) {

    if (!libraryCardRegistered(libraryCard)) return getEmptyUser();
    
    let User = registeredUsers.get(libraryCard);
    
    return User;
}
// ToDo: to correct

function userOwnBookByLogin(userLogin, bookId) {
   
    if (!userRegistered(userLogin)) return false;

    let user = getRegisteredUserByLogin(userLogin);
    if (user.booksOwn.indexOf(bookId) >= 0) return true;
    
    return false;
}

function userInitialsByLogin(userLogin) {

    if (!userRegistered(userLogin)) return '';

    let user = getRegisteredUserByLogin(userLogin);
        
    return userInitials(user);
}

function userInitials(user) {
    return `${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`.toUpperCase();
}

function userFullNameByLogin(userLogin) {

    if (!userRegistered(userLogin)) return '';

    let user = getRegisteredUserByLogin(userLogin);
        
    return userFullName(user);
}

function userFullName(user) {
    return `${user.firstName} ${user.lastName}`;
}

function userFullNameWithHyphenation(user, maxLenght) {
    if (user.firstName.length > maxLenght || user.lastName.length > maxLenght) return `${user.firstName}\n${user.lastName}`;
    return `${user.firstName} ${user.lastName}`;
}

function userLibraryCardByLogin(userLogin) {

    if (!userRegistered(userLogin)) return '';

    let user = getRegisteredUserByLogin(userLogin);
        
    return `${userLibraryCard(user)}`;
}

function userLibraryCard(user) {
    return `${user.libraryCard}`;
}

function userVisits(user) {
    return `${+(user.visits || 0)}`;
}

function userBonuses(user) {
    return `${+(user.bonuses || 0)}`;
}

function userBooks(user) {
    return `${user.booksOwn}`;
}

function userBooks_count(user) {
    return `${user.booksOwn.length}`;
}
