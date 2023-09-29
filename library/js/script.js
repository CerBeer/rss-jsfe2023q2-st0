// Can be considered an entry point. 
// After opening the page, reads the current user and vars from local storage, authorizes him if the user is correct and calls the page display settings.
// Reaction to global events (scroll and resize).

"use strict";

localStorage_init();
localStorage_readVars();

window.addEventListener('resize', function(event) {
    burgerMenuClose();
    // let docWidth = document.documentElement.offsetWidth;
    let docWidth = document.documentElement.scrollWidth;
    if ((docWidth >= 1030) & (burgerMenu.classList.contains('header-nav-slow-mo'))) {
        burgerMenu.classList.remove('header-nav-slow-mo');
    }
    if ((docWidth >= 1430) & (about_pagination_currenIndex() > 2)) about_images_case_translateX(2);
    else if ((docWidth >= 960) & (about_pagination_currenIndex() > 3)) about_images_case_translateX(3);
    else if (docWidth < 960) about_images_case_translateX(about_pagination_currenIndex());
    // if (about_pagination_currenIndex() > 2) about_pagination_button_min.click();
}, true);

// window.addEventListener('scroll', function(event) {
//     burgerMenuClose();
//     profileMenuClose();
//     // favorites_favorites_seasons_list_sticky_setStateView();
// });



if (!userRegistered(authorizedUser)) authorizedUser = '';
else loginUser(authorizedUser);
// setStateView();
menuIntersection_set();
stickyIntersection_set();
matchMedia_set();

// console.log(generateID());

// #self-esteemate

    let self_esteem = 'Самооценка работы: 200 баллов \n \
    Выполнено: \n \
    \n \
    Этап 1: Пользователь не зарегистрирован \n \
    - Карусель в виде слайдера в блоке About с фиксированным началом и концом: На большом экране будет доступно 3 перехода. При нажатии на кнопку, происходит плавное замещение одной картинки другой (слепок. Переход из крайнего левого состояния в крайнее правое происходит только через перелистывание всех элементов посередине, и в обратную сторону. Тоже касается и ширины экранов для планшетов, только теперь кнопок будет 5. А в крайних положениях, стрелки соответствующей стороны будут становиться неактивными. \n \
    - "Слайдер" в виде затемнения/проявления (fade in / fade out) в блоке Favorites: все 4 карточки с книгами будут плавно затухать, а затем плавно появляться следующие. Анимация может быть прервана следующим нажатием на кнопку выбора поры года. Также допускается реализация данного пункта табами. \n \
    \n \
    Этап 2: Пользователь на этапе регистрации \n \
    - Нажатие на кнопку Register или Sign Up открывает модальное окно регистрации. После регистрации, у пользователя изменится иконка пользователя на заглавные буквы имени. Все данные (в том числе и пароль!) сохраняются в localStorage. \n \
    - В разделе Digital Library Cards станет доступна проверка карты пользователя. Если введенные имя и номер карты совпадают с данными пользователя, то отображается панель с информацией, вместо кнопки check the card на 10 секунд. После чего кнопка возвращается в прежнее состояние. \n \
    \n \
    Этап 3: Пользователь на этапе входа в учетную запись после регистрации \n \
    - Нажатие на кнопку Log In или Buy открывает модальное окно авторизации. После этого станут доступны манипуляции с профилем, а также каждая авторизация будет влиять на счетчик визитов. \n \
    \n \
    Этап 4: Пользователь после входа в учетную запись \n \
    - Доступно окно профиля, возможность купить абонемент, отображение информации в Digital Library Cards.'
    console.log(self_esteem);

// #self-esteemate

