// Working with local storage.

function localStorage_init() {

    let keys = Object.keys(localStorage);
    if (keys.indexOf('registeredUsers') < 0) localStorage.setItem('registeredUsers', JSON.stringify(Array.from(registeredUsers.entries())));
    if (keys.indexOf('authorizedUser') < 0) localStorage.setItem('authorizedUser', JSON.stringify(authorizedUser));
   
}

function localStorage_saveVars() {

    localStorage.setItem('registeredUsers', JSON.stringify(Array.from(registeredUsers.entries())));
    localStorage.setItem('authorizedUser', JSON.stringify(authorizedUser));

}

function localStorage_readVars() {

    registeredUsers = new Map(JSON.parse(localStorage.registeredUsers));
    authorizedUser = JSON.parse(localStorage.authorizedUser);
   
}

function localStorage_saveKey(key) {
    if (key === 'registeredUsers') localStorage.setItem('registeredUsers', JSON.stringify(Array.from(registeredUsers.entries())));
    if (key === 'authorizedUser') localStorage.setItem('authorizedUser', JSON.stringify(authorizedUser));
}

