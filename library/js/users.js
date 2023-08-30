
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

    if (registeredUsers.has(user.email)) return false;
    if (!passwordCanBeUsed(user.password)) return false;
    if (user.firstName.length === 0) return false;
    if (user.firstName.length > 12) return false;
    if (user.lastName.length === 0) return false;
    if (user.lastName.length > 12) return false;
    return true;
}

function passwordCanBeUsed(password) {

    let checkedPassword = password.split(' ').join('');
    if (checkedPassword.length < 1) return false;
    return true;
}

function registerUser(user) {
    user.cardId = generateID();
    registeredUsers.set(user.email, user);
    localStorage_saveKey('registeredUsers');
}
