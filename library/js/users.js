
function userCanLogin(userLogin, userPassword) {

    if (!registeredUsers.has(userLogin)) return false;
    
    let checkedUser = registeredUsers.get(userLogin);
    if (userPassword !== checkedUser.password) return false;

    return true;
}

function authorizeUser(userLogin) {

    authorizedUser = userLogin;
    localStorage_saveKey('authorizedUser');
}

function logoutUser() {

    authorizedUser = '';
    localStorage_saveKey('authorizedUser');
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
    const re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    return re.test(email);
}

function registerUser(user) {
    user.cardId = generateID();
    registeredUsers.set(user.email, user);
    localStorage_saveKey('registeredUsers');
}
