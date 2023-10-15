
const game_box_top = document.querySelector('#game-box-top');
const game_box_main = document.querySelector('#game-box-main');
const game_box_modal_window = document.querySelector('.game-box-modal-window');
const game_box_modal_window_bottom_result = document.querySelector('.game-box-modal-window-bottom-result');
const game_box_modal_window_bottom_result_title = document.querySelector('#game-box-modal-window-bottom-result-title');
const game_box_modal_window_bottom_result_score = document.querySelector('#game-box-modal-window-bottom-result-score');
const game_box_modal_window_bottom_best_list_list = document.querySelector('#game-box-modal-window-bottom-best-list-list');
const buttons_start = document.querySelector('#game-box-button-new');
const buttons_pause = document.querySelector('#game-box-top-hr-button-pause');
const buttons_resume = document.querySelector('#game-box-button-resume');

buttons_start.addEventListener('mousedown', game_start);
buttons_pause.addEventListener('mousedown', game_pause);
buttons_resume.addEventListener('mousedown', game_resume);

function game_modalWindow_show() {
    game_box_top.classList.add('filter-blur');
    game_box_main.classList.add('filter-blur');
    game_box_modal_window.classList.remove('display-none');

    if (game_state === game_states.pause) {
        buttons_resume.classList.remove('display-none');
    } else {
        buttons_resume.classList.add('display-none');
    }
    if (game_state === game_states.won || game_state === game_states.end) {
        if (game_state === game_states.won) {
            game_box_modal_window_bottom_result_title.innerText = 'YOU WON';
        } else {
            game_box_modal_window_bottom_result_title.innerText = 'GAME OVER';
        }
        game_box_modal_window_bottom_result_score.innerText = `SCORE: ${game_score_total}`;
        game_box_modal_window_bottom_result.classList.remove('display-none');
    } else {
        game_box_modal_window_bottom_result.classList.add('display-none');
    }
    game_modalWindow_bestgame_update();
    game_modalWindow_bestgame_show();
}

function game_modalWindow_bestgame_update() {
    
    if (game_state !== game_states.won && game_state !== game_states.end) return;

    const now = new Date();
    let nowstr = game_zeroPadding(now.getDate(), 2) + '.';
    nowstr = nowstr + game_zeroPadding(now.getMonth() + 1, 2) + '.';
    nowstr = nowstr + game_zeroPadding(now.getFullYear() - 2000, 2) + ' ';
    nowstr = nowstr + game_zeroPadding(now.getHours(), 2) + ':';
    nowstr = nowstr + game_zeroPadding(now.getMinutes(), 2) + ':';
    nowstr = nowstr + game_zeroPadding(now.getSeconds(), 2);

    const new_result = [nowstr, game_score_total];

    const result = [];
    const bestgames = localStorage_read_bestgames();
    let game_score_add = game_score_total;
    for (let item of bestgames) {
        if (item[1] < game_score_add && game_score_add > 0) {
            result.push(new_result);
            game_score_add = 0;
        }
        result.push(item);
    }
    if (game_score_add > 0) {
        result.push(new_result);
    }

    localStorage_save_bestgames(result.slice(0, 10));
}

function game_zeroPadding(numb, len) {
    let result = `${"0".repeat(len)}`;
    result = `${result}${numb}`;
    return `${result.slice(-len)}`
}

function game_modalWindow_bestgame_show() {
    bestgames = localStorage_read_bestgames();
    let gamesList = '';
    for (let item of bestgames) {
        gamesList = `${gamesList}\n<li class="game-box-modal-window-bottom-best-list-list-item">${item[0]} — ${item[1]}</li>`;
    }
    for (let i = bestgames.length; i < 10; i += 1) {
        gamesList = `${gamesList}\n<li class="game-box-modal-window-bottom-best-list-list-item">none</li>`;
    }

    game_box_modal_window_bottom_best_list_list.innerHTML = gamesList;

}

function game_modalWindow_hide() {
    game_box_top.classList.remove('filter-blur');
    game_box_main.classList.remove('filter-blur');
    game_box_modal_window.classList.add('display-none');
}

function game_start(e) {
    game_timer = clearTimeout(game_timer);
    console.log('Game will start');
    game_init_states();
    game_modalWindow_hide();
    game_init_board_state();
    game_update_board_view();
    game_state = game_states.game;
    game_timer = setInterval(game_play, 1000);
}

function game_pause(e) {
    console.log('Game pause');
    game_state = game_states.pause;
    game_modalWindow_show();
}

function game_resume(e) {
    console.log('Game resume');
    game_modalWindow_hide();
    game_state = game_states.game;
}
