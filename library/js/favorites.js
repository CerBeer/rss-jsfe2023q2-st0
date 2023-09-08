// Section logic favorites.

function favorites_book_descriptions_case_setState(index) {

	if (favorites_book_case.children[index].classList.contains(class_favorites_book_descriptions_visible)) return;

	let i = 0;
	for (let element of favorites_book_case.children) {
		
		if (element.classList.contains(class_favorites_book_descriptions_visible)) {
			element.classList.add(class_favorites_book_descriptions_hide);
			element.addEventListener("animationend", favorites_book_descriptions_case_waitCompletedAnimationHidden);
			return;
		}
		i++;
	}

}

function favorites_book_descriptions_case_waitCompletedAnimationHidden() {

	let i = 0;
	for (let element of favorites_book_case.children) {
		
		if (element.classList.contains(class_favorites_book_descriptions_visible)) {
			element.removeEventListener('animationend', favorites_book_descriptions_case_waitCompletedAnimationHidden);
			element.classList.remove(class_favorites_book_descriptions_visible);
			element.classList.remove(class_favorites_book_descriptions_hide);
			// break;
		}
		i++;
	}

	for (let element of favorites_seasons_buttons) {
		if (element.checked) {
			let value = +element.defaultValue;
			favorites_book_case.children[value].classList.add(class_favorites_book_descriptions_visible);
			break;
		}
	}

}

function favorites_seasons_list_click(e) {
	
	let target = e.target;
	let defaultValue = target.defaultValue;
	if (defaultValue === undefined) return;
	let value = +defaultValue;

	favorites_book_descriptions_case_setState(value);

}

function favorites_book_buttonsBuy_click(e) {

	if (authorizedUser === '') profileMenuClick_action_login_open();
	else {
		let parentElement = e.target.closest('.favorites-book-description');
		let bookid = parentElement.dataset.bookid;
		let user = getRegisteredUserByLogin(authorizedUser);
		if (!userOwnBook(user, bookid)) {
			if (isUserBoughtLibraryCard(user)) {
				tooltip_splash(e.target.parentElement, 'in progress ...', 'position: absolute; transform: translate(100px, 5px); color: #BB945F;');
				userAddBooksOwn(user, bookid);
				saveUser(user);
				setStateView();
			} else {
				modal_windows_buyer_open(bookid);
			}
		}
	}
}

function favorites_book_buttonsBuy_setEvent() {

	for (let season of favorites_book_case.children) {
		for (let book of season.children) {
			let buttonBuy = book.querySelector('.favorites-book-description-l-c5-button');
			buttonBuy.addEventListener('click', favorites_book_buttonsBuy_click);
		}
	}
}

const favorites_book_case = document.querySelector('.favorites-book-case');
const favorites_seasons_list_case = document.querySelector('.favorites-seasons-list');
const favorites_seasons_buttons = document.querySelectorAll('.favorites-seasons-button');

const class_favorites_book_descriptions_visible = 'favorites-book-descriptions-visible';
const class_favorites_book_descriptions_hide = 'favorites-book-descriptions-hide';

const class_favorites_book_own = 'favorites-book-description-l-c5-button-disabled';

for (let element of favorites_seasons_list_case.children) {
	element.addEventListener('click', favorites_seasons_list_click);
};

favorites_book_buttonsBuy_setEvent();

favorites_book_descriptions_case_setState(0);
