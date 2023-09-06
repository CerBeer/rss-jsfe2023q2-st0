
function libraryCard_action_checkTheCard() {

    let fullName = document.querySelector('.library-card-card-check-username').value;
    let libraryCard = document.querySelector('.library-card-card-check-cardnumber').value;
    let user = getRegisteredUserByLibraryCardAndFullName(libraryCard, fullName);
    if (userLibraryCard(user) !== '') {
        library_card_cardsprofile_setStateView(libraryCardsButton_CheckTheCard_cardsprofile, user);
        libraryCardsButton_CheckTheCard_button_outer.classList.add('class-display-none');
        libraryCardsButton_CheckTheCard_cardsprofile.classList.remove('class-display-none');
        setTimeout(() => {
            libraryCardsButton_CheckTheCard_button_outer.classList.remove('class-display-none');
            libraryCardsButton_CheckTheCard_cardsprofile.classList.add('class-display-none');
        }, 10000);
    }
}



const libraryCardsButton_LogIn = document.querySelector('.library-card-card-r-login-button');
const libraryCardsButton_Register = document.querySelector('.library-card-card-r-signup-button');
const libraryCardsButton_Profile = document.querySelector('.library-card-card-r-profile-button');
const libraryCardsButton_CheckTheCard_button = document.querySelector('.library-card-card-l-form-form-button-button');
const libraryCardsButton_CheckTheCard_button_outer = document.querySelector('.library-card-card-l-form-form-button');
const libraryCardsButton_CheckTheCard_cardsprofile = document.querySelector('.library-card-card-l-check-cardsprofile');

libraryCardsButton_LogIn.addEventListener('click', profileMenuClick_action_login);
libraryCardsButton_Register.addEventListener('click', profileMenuClick_action_register);
libraryCardsButton_Profile.addEventListener('click', profileMenuClick_action_myProfile);
libraryCardsButton_CheckTheCard_button.addEventListener('click', libraryCard_action_checkTheCard);
