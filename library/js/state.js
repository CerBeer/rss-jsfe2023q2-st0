
function setStateView() {
    
    header_profile_icon_setStateView();
    header_profile_drop_menu_profile_header_setStateView();

    header_profile_drop_menu_setStateView();

    modalWindow_myProfile_setStateView();

    favorites_book_ownership_setStateView();

    library_card_setStateView();

}

function header_profile_icon_setStateView() {

    let header_profile_icon = document.querySelector('.header-profile-icon');
    const user = getRegisteredUserByLogin(authorizedUser);
    header_profile_icon.dataset.authorizedUser = userInitials(user);
    header_profile_icon.title = userFullName(user);
}

function header_profile_drop_menu_profile_header_setStateView() {
    let header_profile_drop_menu_profile_header = document.querySelector('.header-profile-drop-menu-profile-header');
    header_profile_drop_menu_profile_header.dataset.authorizedUserLibraryCard = userLibraryCardByLogin(authorizedUser);
}

function header_profile_drop_menu_setStateView() {

    if (authorizedUser === '') {
        document.querySelector('.header-profile-drop-menu-profile-menu-logged-out').classList.remove('header-profile-drop-menu-profile-menu-display-none');
        document.querySelector('.header-profile-drop-menu-profile-menu-logged-in').classList.add('header-profile-drop-menu-profile-menu-display-none');
    } else {
        document.querySelector('.header-profile-drop-menu-profile-menu-logged-out').classList.add('header-profile-drop-menu-profile-menu-display-none');
        document.querySelector('.header-profile-drop-menu-profile-menu-logged-in').classList.remove('header-profile-drop-menu-profile-menu-display-none');
    }
}

function favorites_book_ownership_setStateView() {

    for (let season of favorites_book_case.children) {
        for (let book of season.children) {
            let bookid = book.dataset.bookid;
            let buttonBuy = book.querySelector('.favorites-book-description-l-c5-button');
            if (userOwnBookByLogin(authorizedUser, bookid)) {
                buttonBuy.classList.add(class_favorites_book_own);
            } else {
                buttonBuy.classList.remove(class_favorites_book_own);
            }
        }
    }
}

function library_card_setStateView() {

    if (authorizedUser === '') {
        document.querySelector('.library-card-card-login').classList.add('class-display-none');
        document.querySelector('.library-card-card-nologin').classList.remove('class-display-none');
    } else {
        library_card_cardsprofile_setStateView(document.querySelector('.library-card-card-l-cardsprofile'), getRegisteredUserByLogin(authorizedUser));
        document.querySelector('.library-card-card-login-username').value = userFullNameByLogin(authorizedUser);
        document.querySelector('.library-card-card-login-cardnumber').value = userLibraryCardByLogin(authorizedUser);
        document.querySelector('.library-card-card-login').classList.remove('class-display-none');
        document.querySelector('.library-card-card-nologin').classList.add('class-display-none');
    }
}

function modalWindow_myProfile_setStateView() {

    if (authorizedUser === '') return;
    
    let user = getRegisteredUserByLogin(authorizedUser);
    modal_window_profile_usericon.innerText = userInitials(user);
    modal_window_profile_username.innerText = userFullNameWithHyphenation(user, 10);
    modal_window_profile_cardnumber.innerText = userLibraryCard(user);

    library_card_cardsprofile_setStateView(modal_window_profile_cardprofile, user);

    let books = userBooks(user);
    let booksList = '';
    for (let bookid of books) {
        book = listOfBooks[bookid];
        booksList = `${booksList}\n<li class="modal-windows-window-profile-right-rentedbooks-listbooks-item">${book.name}, ${book.author}`;
    }
    modal_window_profile_listbooks.innerHTML = booksList;
}

function library_card_cardsprofile_setStateView(cardprofile, user) {

    let field = cardprofile.querySelector('.modal-windows-window-profile-right-cardsprofile-column-count-visits');
    field.innerText = userVisits(user);
    
    field = cardprofile.querySelector('.modal-windows-window-profile-right-cardsprofile-column-count-bonuses');
    field.innerText = userBonuses(user);
    
    field = cardprofile.querySelector('.modal-windows-window-profile-right-cardsprofile-column-count-books');
    field.innerText = userBooks_count(user);

}

// #close menu when profile-icon not visible

function menuIntersection(entries) {

    burgerMenuClose();
    profileMenuClose();
}

function menuIntersection_set() {

    let options = {root: null, threshold: 0};

    let observerMenu = new IntersectionObserver(menuIntersection, options);
    let targetMenu = document.querySelector('.header-profile-icon');
    observerMenu.observe(targetMenu);
}

// #make border-bottom on element when is sticky

function stickyIntersection(entries){

    const sticky  = document.querySelector('.favorites-seasons-list');

    if (window.getComputedStyle(sticky).position !== 'sticky') {
        sticky.classList.remove('favorites-seasons-list-sticky');
        return;
    }

    if (sticky.getBoundingClientRect().y <= 0) sticky.classList.add('favorites-seasons-list-sticky');
    else if (entries[0].isIntersecting) sticky.classList.remove('favorites-seasons-list-sticky');
        else  sticky.classList.add('favorites-seasons-list-sticky');
}

function stickyIntersection_set() {

    let options = {root: null, threshold: 0};
    let observerSticky = new IntersectionObserver(stickyIntersection, options);
    let targetSticky = document.querySelector('.favorites-seasons');
    observerSticky.observe(targetSticky);
}

// #make or delete border-bottom on element when it not sticky

function matchMedia_set() {

    const mediaQuery = window.matchMedia('(min-width: 1261px)');
    mediaQuery.addEventListener("change", (e) => {
        const sticky  = document.querySelector('.favorites-seasons-list');
        if (e.matches) sticky.classList.remove('favorites-seasons-list-sticky');
        else if (sticky.getBoundingClientRect().y <= 0) sticky.classList.add('favorites-seasons-list-sticky');
    });
}