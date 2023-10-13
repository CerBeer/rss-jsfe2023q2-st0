
buttons_start.addEventListener('mousedown', game_start);

buttons_blinkspeed_plus.addEventListener('mousedown', game_blinkspeed_plus);
buttons_blinkspeed_minus.addEventListener('mousedown', game_blinkspeed_minus);

function game_init(e) {
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
}

function game_init_board_state() {
    let game_figureCurrent = 0;
    for (let i = 0; i < game_pool_height; i +=1 ) {
        let current_row = [];
        for (let l = 0; l < game_pool_width; l +=1 ) {
            current_row.push({figure: game_figureCurrent, state: figure_states.stand});
            game_figureCurrent = game_figureCurrent + 1;
            if (game_figureCurrent >= game_numberFigures_current) {
                game_figureCurrent = 0;
            }
        }
        board_state.push(current_row);
        game_figureCurrent = game_figureCurrent + Math.floor(random99_range(0, game_numberFigures_current - 1) / 2) + 1;
        if (game_figureCurrent >= game_numberFigures_current) game_figureCurrent -= game_numberFigures_current;
    }
}

function game_create_board() {

    game_box_main_gameboard_board.innerHTML = '';

    let game_figureCurrent = 0;
    for (let i = 0; i < game_pool_height; i +=1 ) {
        for (let l = 0; l < game_pool_width; l +=1 ) {
            const imageBox = document.createElement('div');
            imageBox.classList.add('game-box-main-gameboard-image');
            imageBox.dataset.place = i * game_pool_width + l;

            const image = document.createElement('img');
            image.classList.add('game-box-main-gameboard-image-image');
            image.dataset.placeimg = i * game_pool_width + l;
            image.dataset.placefig = board_state[i][l].figure;
            image.src = fruits[board_state[i][l].figure];
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
    let clickedNumber = Number(e.target.dataset.placebtn);
    game_change_place(clickedNumber);
}

function game_change_place(numberButton) {
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
    game_check_gameboard();
}

function game_coordinatesByNumberPlace(number_place) {
    let place_y = Math.floor(number_place / game_pool_width);
    let place_x = number_place % game_pool_width;
    return [place_y, place_x];
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
}

function game_check_gameboard() {
    let placeWith2 = [];
    for (let i = 0; i < game_pool_height; i +=1 ) {
        for (let l = 0; l < game_pool_width; l +=1 ) {
            if (game_check_gameboard_check_place([i, l]) > 1) placeWith2.push([i, l]);
        }
    }
    if (placeWith2.length > 0) console.log(placeWith2);
}

function game_check_gameboard_check_place(place) {
    let resultv = 0;
    let resulth = 0;
    const checked_figure = board_state[place[0]][place[1]].figure;
    if (place[0] > 0) {
        if (board_state[place[0] - 1][place[1]].figure === checked_figure) resultv += 1;
    }
    if (place[1] > 0) {
        if (board_state[place[0]][place[1] - 1].figure === checked_figure) resulth += 1;
    }
    if (place[0] < game_pool_height - 1) {
        if (board_state[place[0] + 1][place[1]].figure === checked_figure) resultv += 1;
    }
    if (place[1] < game_pool_width - 1) {
        if (board_state[place[0]][place[1] + 1].figure === checked_figure) resulth += 1;
    }
    return Math.max(resultv, resulth);
}
