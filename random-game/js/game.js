
buttons_blinkspeed_plus.addEventListener('mousedown', game_blinkspeed_plus);
buttons_blinkspeed_minus.addEventListener('mousedown', game_blinkspeed_minus);

function game_init(e) {
    // game_states_recast
    game_states_recast = true;
    game_sound_volume = 0.05;
    game_sound_enabled = true;
    game_init_states();
    game_init_board_state();
    game_create_board();
    game_set_volume_state();
    game_set_markers_state();

    localStorage_init();
    
    game_blinkspeed_set();
    setTimeout(game_gameboard_autochange_figure, game_blinkspeed_timeout);

    game_modalWindow_show();
}

function game_init_states() {
    
    //number of different figures
    game_numberFigures_current = 6;
    //current game state
    game_state = game_states.stop;
    game_gameboard_autochange = true;
    game_blinkspeed_current = 0;

    //total points
    game_score_total = 0;
    //total points in current level
    game_score_level = 0;
    //total points per level
    game_score_level_full = 1000;
    //score multiplier if more than three digits are broken
    game_score_multiplier = 1.5;
    //score multiplication factor if bursts more than once per step
    game_score_multiplier_next = 2;
    //current score multiplier
    game_score_multiplier_current = 1;
    //cost of one burst figure
    game_score_figure = 50;

    //full game time
    game_time_full = 3 * 60;
    //game time left
    game_time_left = game_time_full;
    //reduction of time per piece exchange
    //increases by 1 when moving to the next level
    game_time_step = 3;
    //time return for each broken piece
    game_time_figure = 2;
    //increases with increasing level of time penalty per step
    game_time_level_up = 1;

    //current game level
    game_level = 1;
    //the maximum level of the game that must be completed to win
    game_level_max = 5;
    //the number of different new shapes added when moving to a new level
    game_level_step_addFigure = 2;

    //the game state is recalculated during which user actions are blocked
    // game_states_recast
    game_states_recast = false;
}

function game_init_board_state() {
    board_state = [];
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

function game_update_board_view() {

    for (let i = 0; i < game_pool_height; i +=1 ) {
        for (let l = 0; l < game_pool_width; l +=1 ) {
            const numberPlace = game_numberPlaceByCoordinates([i, l]);
            const image = document.querySelector('[data-placeimg = "' + numberPlace + '"]');
            image.classList.remove('game-box-main-gameboard-image-image-80');
            image.dataset.placefig = board_state[i][l];
            image.src = fruits[board_state[i][l]];
        }
    }
    
    setTimeout(game_rise_allfigure, game_image_update_timeout);

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

function game_play(e) {
    if (game_state !== game_states.game) return;
    game_time_left -= 1;
    if (game_time_left < 0) {
        game_time_left = 0;
    }
    game_set_markers_state();
    if (game_time_left === 0) {
        console.log('Game OVER');
        game_timer = clearTimeout(game_timer);
        game_state = game_states.end;
        game_modalWindow_show();
    }
}

function game_click_change_button(e) {
    e.stopPropagation();
    let clickedNumber = Number(e.target.dataset.placebtn);
    game_time_left -= game_time_step;
    game_change_place(clickedNumber);
}

function game_change_place(numberButton) {
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
    const numberItem0 = changedElement0.dataset.placefig;
    const changedElement1 = document.querySelector('[data-placeimg = "' + changedPlace[1] + '"]');
    const numberItem1 = changedElement1.dataset.placefig;
    
    setTimeout(game_figure_change_start, 100, changedElement0, numberItem1, changedElement1, numberItem0);
}

function game_figure_change_start(changedElement0, numberItem0, changedElement1, numberItem1) {
    changedElement0.style.scale = 0;
    changedElement1.style.scale = 0;
    game_playSound(game_sounds.change);
    setTimeout(game_figure_change_end, game_image_update_timeout, changedElement0, numberItem0, changedElement1, numberItem1);
}

function game_figure_change_end(changedElement0, numberItem0, changedElement1, numberItem1) {
    changedElement0.src = fruits[numberItem0];
    changedElement0.style.scale = 0.8;
    changedElement0.dataset.placefig = numberItem0;
    changedElement1.src = fruits[numberItem1];
    changedElement1.style.scale = 0.8;
    changedElement1.dataset.placefig = numberItem1;
    setTimeout(game_check_gameboard, 100);
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
        game_score_calculate(all_with2.size);
        game_board_clear_place(all_with2);
    } else {
        game_score_multiplier_current = 1;
        game_states_recast = false;
    }
}

function game_score_calculate(count_figure) {

    let score_add = 3 * game_score_figure;
    let figure_all = count_figure - 3;
    if (figure_all > 0) {
        score_add += figure_all * game_score_figure * game_score_multiplier;
    }
    score_add = Math.floor(score_add * game_score_multiplier_current);
    
    game_score_total += score_add;
    game_score_level += score_add;
    if (game_score_level > game_score_level_full) {
        game_level += 1;
        game_score_level -= game_score_level_full;
        game_numberFigures_current += game_level_step_addFigure;
        game_time_step += game_time_level_up;
    }

    game_time_left += count_figure * game_time_figure;
    if (game_time_left > game_time_full) game_time_left = game_time_full;

    if (game_level > game_level_max) {
        game_state = game_states.won;
        console.log('You WON!');
        game_score_total += (game_time_left * 9);
        game_set_markers_state();
        game_modalWindow_show();
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
    setTimeout(game_figures_delete_end, game_image_update_timeout, deletedElements);
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
    if (places_changed.length > 0) {
        setTimeout(game_check_figures_change_start, 100, places_changed);
    } else {
        setTimeout(game_check_gameboard_fill_empty_places, 100);
    }
}

function game_check_figures_change_start(places_changed) {
    let changedElements = [];
    for (let place_changed of places_changed) {
        const changedElement = document.querySelector('[data-placeimg = "' + place_changed + '"]');
        changedElement.style.scale = 0.1;
        changedElements.push(changedElement);
    }
    setTimeout(game_check_figures_change_end, game_image_update_timeout, changedElements);
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
    setTimeout(game_check_gameboard_fill_empty_places, game_image_update_timeout);
}

function game_check_gameboard_fill_empty_places() {
    let places_changed = [];
    let last_figure = 0;
    for (let i = 0; i < game_pool_height; i += 1) {
        for (let l = 0; l < game_pool_width; l += 1) {
            if (board_state[i][l] === 0) {
                let new_figure = random99_range(1, game_numberFigures_current);
                while (new_figure === last_figure) {
                    new_figure = random99_range(1, game_numberFigures_current);
                }
                board_state[i][l] = random99_range(1, game_numberFigures_current);
                places_changed.push(game_numberPlaceByCoordinates([i, l]));
                last_figure = new_figure;
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
    game_score_multiplier_current = game_score_multiplier_next;
    if (game_state === game_states.game) {
        setTimeout(game_check_gameboard, 550);
    }
}
