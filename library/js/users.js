
function saveUser(user) {
    registeredUsers.set(user.email, user);
    localStorage_saveKey('registeredUsers');
}

function registerUser(user) {
    user.libraryCard = generateLibraryCardNumber();
    user.bonuses = generateID() % 100;
    // user.booksOwn = ['04', '08'];
    saveUser(user);
}

function loginUser(userLogin) {

    authorizedUser = userLogin;
    localStorage_saveKey('authorizedUser');

    let user = getRegisteredUserByLogin(userLogin);
    user.visits = parseInt(user.visits || 0) + 1;
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

    if (registeredUsers.has(userLogin)) return true;

    return false;
}

function userCanLogin(userLogin, userPassword) {

    if (!userRegistered(userLogin)) return false;
    
    let checkedUser = registeredUsers.get(userLogin);
    if (userPassword !== checkedUser.password) return false;

    return true;
}

function userCanRegister(user) {

    if (userRegistered(user.email)) return {err: true, message: "The specified email has already been used for registration"};
    if (!passwordCanBeUsed(user.password)) return {err: true, message: ""};
    if (!eMailIsValid(user.email)) return {err: true, message: "eMail is no valid"};
    if (user.firstName.length === 0) return {err: true, message: ""};
    if (user.firstName.length > 12) return {err: true, message: ""};
    if (user.lastName.length === 0) return {err: true, message: ""};
    if (user.lastName.length > 12) return {err: true, message: ""};
    return {err: false, message: ""};
}

function passwordCanBeUsed(password) {

    let checkedPassword = password.replaceAll(' ', '');
    if (checkedPassword.length < 8) return false;
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
function isLibraryCardRegistered(libraryCard) {

    for (let value of registeredUsers.values()) {
        if (value.libraryCard === libraryCard) return true;
    }

    return false;
}

function getRegisteredUserByLibraryCard(libraryCard) {

    for (let value of registeredUsers.values()) {
        if (value.libraryCard === libraryCard) return value;
    }

    return getEmptyUser();
}

function getRegisteredUserByLibraryCardAndFullName(libraryCard, FullName) {
    
    let user = getRegisteredUserByLibraryCard(libraryCard);
    if (userFullName(user) === FullName) return user;
    
    return getEmptyUser();
}
// ToDo: to correct

function userOwnBookByLogin(userLogin, bookId) {
   
    if (!userRegistered(userLogin)) return false;

    let user = getRegisteredUserByLogin(userLogin);
    
    return userOwnBook(user, bookId);
}

function userOwnBook(user, bookId) {
   
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

function userBooksByLogin(userLogin) {
   
    if (!userRegistered(userLogin)) return [];

    let user = getRegisteredUserByLogin(userLogin);
    
    return booksOwn;
}

function userLibraryCard(user) {
    return `${user.libraryCard}`;
}

function userVisits(user) {
    return `${user.visits || 0}`;
}

function userBonuses(user) {
    return `${user.bonuses || 0}`;
}

function userBooks(user) {
    return user.booksOwn;
}

function userBooks_count(user) {
    return `${user.booksOwn.length || 0}`;
}

function userAddBooksOwn(user, bookid) {
    if (user.booksOwn.indexOf(bookid) < 0) {
        user.booksOwn.push(bookid);
        return user;
    }
}

function userBuysLibraryCard(user) {
    user.libraryCardPurchased = true;
    return user;
}

function isUserBoughtLibraryCard(user) {
    return user.libraryCardPurchased;
}

function normalizeUserBankCardNumber(user) {

    user.bankCardNumber = user.bankCardNumber.replaceAll(' ', '');
    return user;
}

function stateUserBankCardNumber(user) {

    if (user.bankCardNumber.length < 16) return user.bankCardNumber;
    let card = user.bankCardNumber;
    return `${card.slice(0, 4)} ${card.slice(4, 8)} ${card.slice(8, 12)} ${card.slice(12)}`;
}
