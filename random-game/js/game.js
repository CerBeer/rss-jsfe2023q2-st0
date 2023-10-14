
buttons_start.addEventListener('mousedown', game_start);

buttons_blinkspeed_plus.addEventListener('mousedown', game_blinkspeed_plus);
buttons_blinkspeed_minus.addEventListener('mousedown', game_blinkspeed_minus);

function game_init(e) {
    // game_states_recast
    game_states_recast = true;
    game_sound_volume = 0.05;
    game_sound_enabled = false;
    game_init_states();
    game_init_board_state();
    game_create_board();
    game_set_volume_state();
    game_set_markers_state();

    game_blinkspeed_set();
    setTimeout(game_gameboard_autochange_figure, game_blinkspeed_timeout);
}

function game_init_states() {
    game_numberFigures_current = 6;
    game_state = game_states.stop;
    game_gameboard_autochange = true;
    game_blinkspeed_current = 0;
    game_score_total = 0;
    game_score_level = 0;
    game_score_level_full = 100;
    game_time_full = 5 * 60;
    game_time_left = game_time_full;
    // game_states_recast
    game_states_recast = false;
}

function game_init_board_state() {
    let game_figureCurrent = 1;
    for (let i = 0; i < game_pool_height; i +=1 ) {
        let current_row = [];
        for (let l = 0; l < game_pool_width; l +=1 ) {
            current_row.push(game_figureCurrent);
            game_figureCurrent = game_figureCurrent + 1;
            if (game_figureCurrent > game_numberFigures_current) {
                game_figureCurrent = 1;
            }
        }
        board_state.push(current_row);
        game_figureCurrent = game_figureCurrent + Math.floor(random99_range(1, game_numberFigures_current) / 2) + 1;
        if (game_figureCurrent > game_numberFigures_current) game_figureCurrent -= game_numberFigures_current;
    }
}

function game_create_board() {

    game_box_main_gameboard_board.innerHTML = '';

    for (let i = 0; i < game_pool_height; i +=1 ) {
        for (let l = 0; l < game_pool_width; l +=1 ) {
            const imageBox = document.createElement('div');
            imageBox.classList.add('game-box-main-gameboard-image');
            imageBox.dataset.place = i * game_pool_width + l;

            const image = document.createElement('img');
            image.classList.add('game-box-main-gameboard-image-image');
            image.dataset.placeimg = i * game_pool_width + l;
            image.dataset.placefig = board_state[i][l];
            image.src = fruits[board_state[i][l]];
            // image.alt = api.getALT(result);

            imageBox.appendChild(image);
            game_box_main_gameboard_board.appendChild(imageBox);

            if (l < game_pool_width - 1) {
                const vr = document.createElement('div');
                vr.classList.add('game-box-main-gameboard-image-vr');
                let placebtn = i * game_pool_width + l;
                vr.dataset.placebtn = placebtn;
                game_box_main_gameboard_board.appendChild(vr);
                vr.addEventListener('mousedown', game_click_change_button);
                game_numberChangesButtons.push(placebtn);
            }
        }
        if (i < game_pool_height - 1) {
            for (let l = 0; l < game_pool_width; l +=1 ) {
                const vr = document.createElement('div');
                vr.classList.add('game-box-main-gameboard-image-hr');
                let placebtn = i * game_pool_width + l + 100;
                vr.dataset.placebtn = placebtn;
                game_box_main_gameboard_board.appendChild(vr);
                vr.addEventListener('mousedown', game_click_change_button);
                game_numberChangesButtons.push(placebtn);
            }
        }
    }
    
    setTimeout(game_rise_allfigure, 200);

}

function game_rise_allfigure() {
    const classModal = document.querySelectorAll('.game-box-main-gameboard-image-image');
    for (let el of classModal) {
        el.classList.add('game-box-main-gameboard-image-image-80');
    }
}

function game_blinkspeed_plus(e) {
    if (game_blinkspeed_current < game_blinkspeed_max) {
        game_blinkspeed_current += 1;
        game_blinkspeed_set();
    }
}

function game_blinkspeed_minus(e) {
    if (game_blinkspeed_current > game_blinkspeed_min) {
        game_blinkspeed_current -= 1;
        if (game_blinkspeed_current < 0) game_blinkspeed_current = 0;
        game_blinkspeed_set();
    }
}

function game_blinkspeed_set() {
    buttons_blinkspeed_counter.innerText = game_blinkspeed_current;
    game_blinkspeed_timeout = (5 - game_blinkspeed_current) * game_blinkspeed_timeout_step
}

function game_gameboard_autochange_figure() {
    if (game_state === game_states.stop) {
        if (game_blinkspeed_current > 0) {
            const numberButton = random99_range(0, game_numberChangesButtons.length - 1);
            game_change_place(game_numberChangesButtons[numberButton]);
        }
        setTimeout(game_gameboard_autochange_figure, game_blinkspeed_timeout);
    }
}

function game_start(e) {
    console.log('Game will start');
}

function game_click_change_button(e) {
    e.stopPropagation();
    let clickedNumber = Number(e.target.dataset.placebtn);
    game_change_place(clickedNumber);
}

function game_change_place(numberButton) {
    console.log(game_states_recast);
    if (game_states_recast) return;
    // game_states_recast
    game_states_recast = true;
    const changedPlace = game_numberChangedPlacesByNumberButton(numberButton);
    game_change_figure(changedPlace);
    game_board_change_place(changedPlace);
}

function game_numberChangedPlacesByNumberButton(numberButton) {
    let place_first_number = numberButton;
    let place_second_number = numberButton + 1;
    if (numberButton >= 100) {
        place_first_number -= 100;
        place_second_number = place_first_number + game_pool_width;
    }
    return [place_first_number, place_second_number];
}

function game_board_change_place(changedPlace) {
    const place_coordenates0 = game_coordinatesByNumberPlace(changedPlace[0]);
    const place_coordenates1 = game_coordinatesByNumberPlace(changedPlace[1]);
    const place_temp0 = board_state[place_coordenates0[0]][place_coordenates0[1]];
    const place_temp1 = board_state[place_coordenates1[0]][place_coordenates1[1]];
    board_state[place_coordenates0[0]][place_coordenates0[1]] = place_temp1;
    board_state[place_coordenates1[0]][place_coordenates1[1]] = place_temp0;
}

function game_coordinatesByNumberPlace(number_place) {
    let place_y = Math.floor(number_place / game_pool_width);
    let place_x = number_place % game_pool_width;
    return [place_y, place_x];
}

function game_numberPlaceByCoordinates(place) {
    let result = place[0] * (game_pool_width) + place[1];
    return result;
}

function game_change_figure(changedPlace) {
    
    const changedElement0 = document.querySelector('[data-placeimg = "' + changedPlace[0] + '"]');
    const numFigure0 = changedElement0.dataset.placefig;
    const changedElement1 = document.querySelector('[data-placeimg = "' + changedPlace[1] + '"]');
    const numFigure1 = changedElement1.dataset.placefig;
    
    setTimeout(game_figure_change_start, 100, changedElement0, numFigure1);
    setTimeout(game_figure_change_start, 100, changedElement1, numFigure0);
}

function game_figure_change_start(changedElement, numberItem) {
    changedElement.style.scale = 0;
    setTimeout(game_figure_change_end, 500, changedElement, numberItem);
    game_playSound(game_sounds.change);
}

function game_figure_change_end(changedElement, numberItem) {
    changedElement.src = fruits[numberItem];
    changedElement.style.scale = 0.8;
    changedElement.dataset.placefig = numberItem;
    setTimeout(game_check_gameboard, 200);
    // game_check_gameboard();
}

function game_check_gameboard() {
    let placeWith2 = [];
    board_state_calc = [];
    for (let i = 0; i < game_pool_height; i += 1 ) {
        let gameboard_current_row = [];
        for (let l = 0; l < game_pool_width; l += 1 ) {
            let count = game_check_gameboard_check_place([i, l]);
            gameboard_current_row.push(count);
            if (count > 1) placeWith2.push([i, l]);
        }
        board_state_calc.push(gameboard_current_row);
    }
    all_with2 = game_check_gameboard_findAll_with2(placeWith2);
    if (all_with2.size > 0) {
        game_board_clear_place(all_with2);
        // console.log(all_with2);
    } else {
        // game_states_recast
        game_states_recast = false;
    }
}

function game_check_gameboard_check_place(place) {
    let resultv = 0;
    let resulth = 0;
    const checked_figure = board_state[place[0]][place[1]];
    if (checked_figure === 0) return 0;
    if (place[0] > 0) {
        if (board_state[place[0] - 1][place[1]] === checked_figure) resultv += 1;
    }
    if (place[1] > 0) {
        if (board_state[place[0]][place[1] - 1] === checked_figure) resulth += 1;
    }
    if (place[0] < game_pool_height - 1) {
        if (board_state[place[0] + 1][place[1]] === checked_figure) resultv += 1;
    }
    if (place[1] < game_pool_width - 1) {
        if (board_state[place[0]][place[1] + 1] === checked_figure) resulth += 1;
    }
    return Math.max(resultv, resulth);
}

function game_check_gameboard_findAll_with2(placeWith2) {
    let result = new Set();
    if (placeWith2.length === 0) return result;
    while (placeWith2.length > 0) {
        currentPlace = placeWith2.pop();
        result.add(game_numberPlaceByCoordinates(currentPlace));
        let new_With2 = game_check_gameboard_setNeighbors(currentPlace);
        placeWith2 = placeWith2.concat(new_With2);
    }
    return result;
}

function game_check_gameboard_setNeighbors(place) {
    let result = [];
    const checked_figure = board_state[place[0]][place[1]];
    if (place[0] > 0) {
        if (board_state[place[0] - 1][place[1]] === checked_figure) {
            if (board_state_calc[place[0] - 1][place[1]] < 2) {
                result.push([place[0] - 1, place[1]]);
                board_state_calc[place[0] - 1][place[1]] = 2;
            }
        }
    }
    if (place[1] > 0) {
        if (board_state[place[0]][place[1] - 1] === checked_figure)  {
            if (board_state_calc[place[0]][place[1] - 1] < 2) {
                result.push([place[0], place[1] - 1]);
                board_state_calc[place[0]][place[1] - 1] = 2;
            }
        }
    }
    if (place[0] < game_pool_height - 1) {
        if (board_state[place[0] + 1][place[1]] === checked_figure)  {
            if (board_state_calc[place[0] + 1][place[1]] < 2) {
                result.push([place[0] + 1, place[1]]);
                board_state_calc[place[0] + 1][place[1]] = 2;
            }
        }
    }
    if (place[1] < game_pool_width - 1) {
        if (board_state[place[0]][place[1] + 1] === checked_figure)  {
            if (board_state_calc[place[0]][place[1] + 1] < 2) {
                result.push([place[0], place[1] + 1]);
                board_state_calc[place[0]][place[1] + 1] = 2;
            }
        }
    }
    return result;
}

function game_board_clear_place(deletedPlaces) {
    for (let delPlace of deletedPlaces) {
        const place_coordenates = game_coordinatesByNumberPlace(delPlace);
        board_state[place_coordenates[0]][place_coordenates[1]] = 0;
    }
    game_figures_delete_start(deletedPlaces);
}

function game_figures_delete_start(deletedPlaces) {
    let deletedElements = [];
    for (let delPlace of deletedPlaces) {
        const deletedElement = document.querySelector('[data-placeimg = "' + delPlace + '"]');
        deletedElement.style.scale = 4;
        deletedElements.push(deletedElement)
    }
    setTimeout(game_figures_delete_end, 500, deletedElements);
    game_playSound(game_sounds.boom);
}

function game_figures_delete_end(deletedElements) {
    for (let deletedElement of deletedElements) {
        deletedElement.src = noImage;
        deletedElement.style.scale = 0.1;
        deletedElement.dataset.placefig = 0;
    }
    board_state_new = game_check_gameboard_down();
    places_changed = game_check_gameboard_update(board_state_new);
}

function game_check_gameboard_down() {
    board_state_new = game_board_state_clone();
    for (let l = 0; l < game_pool_width; l += 1) {
        for (let i = game_pool_height - 1; i > 0; i -= 1) {

            if (game_check_gameboard_new_placeIsEmpty(board_state_new, [i, l])) {
                for (let t = i - 1; t >= 0; t -= 1) {
                    if (!game_check_gameboard_new_placeIsEmpty(board_state_new, [t, l])) {
                        board_state_new[i][l] = board_state_new[t][l];
                        board_state_new[t][l] = 0;
                        break;
                    }
                }
            }
        }
    }
    // console.log(board_state_new);
    return board_state_new;
}

function game_board_state_clone() {
    let board_state_new = [];
    for (let i = 0; i < game_pool_height; i += 1) {
        let current_row = [];
        for (let l = 0; l < game_pool_width; l += 1) {
            current_row.push(board_state[i][l]);
        }
        board_state_new.push(current_row);
    }
    return board_state_new;
}

function game_check_gameboard_new_placeIsEmpty(board_state_new, place) {
    const checked_figure = board_state_new[place[0]][place[1]];
    if (checked_figure === 0) return true;
    return false;
}

function game_check_gameboard_update(board_state_new) {
    let places_changed = [];
    for (let i = 0; i < game_pool_height; i += 1) {
        for (let l = 0; l < game_pool_width; l += 1) {
            if (board_state[i][l] !== board_state_new[i][l]) {
                board_state[i][l] = board_state_new[i][l];
                places_changed.push(game_numberPlaceByCoordinates([i, l]));
            }
        }
    }
    setTimeout(game_check_figures_change_start, 500, places_changed);
}

function game_check_figures_change_start(places_changed) {
    let changedElements = [];
    for (let place_changed of places_changed) {
        const changedElement = document.querySelector('[data-placeimg = "' + place_changed + '"]');
        changedElement.style.scale = 0.1;
        changedElements.push(changedElement);
    }
    setTimeout(game_check_figures_change_end, 500, changedElements);
    game_playSound(game_sounds.fall);
}

function game_check_figures_change_end(changedElements) {
    for (let changedElement of changedElements) {
        const place = game_coordinatesByNumberPlace(changedElement.dataset.placeimg);
        const figure = board_state[place[0]][place[1]];
        changedElement.src = fruits[figure];
        changedElement.style.scale = 0.8;
        changedElement.dataset.placefig = figure;
    }
    setTimeout(game_check_gameboard_fill_empty_places, 500);
}

function game_check_gameboard_fill_empty_places() {
    let places_changed = [];
    for (let i = 0; i < game_pool_height; i += 1) {
        for (let l = 0; l < game_pool_width; l += 1) {
            if (board_state[i][l] === 0) {
                board_state[i][l] = random99_range(1, game_numberFigures_current);
                places_changed.push(game_numberPlaceByCoordinates([i, l]));
            }
        }
    }
    setTimeout(game_check_gameboard_fill_empty_places_start, 100, places_changed);
}

function game_check_gameboard_fill_empty_places_start(places_changed) {
    let changedElements = [];
    for (let place_changed of places_changed) {
        const changedElement = document.querySelector('[data-placeimg = "' + place_changed + '"]');
        changedElement.style.scale = 0.1;
        changedElements.push(changedElement);
    }
    setTimeout(game_check_gameboard_fill_empty_places_end, 100, changedElements);
    game_playSound(game_sounds.newup);
}

function game_check_gameboard_fill_empty_places_end(changedElements) {
    for (let changedElement of changedElements) {
        const place = game_coordinatesByNumberPlace(changedElement.dataset.placeimg);
        const figure = board_state[place[0]][place[1]];
        changedElement.src = fruits[figure];
        changedElement.style.scale = 0.8;
        changedElement.dataset.placefig = figure;
    }
    setTimeout(game_check_gameboard, 500);
}
