
function setStateView() {
    
    header_profile_icon_setStateView();
    header_profile_drop_menu_profile_header_setStateView();

    header_profile_drop_menu_setStateView();

    favorites_book_ownership_setStateView();

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
