
const game_box_top = document.querySelector('#game-box-top');
const game_box_main = document.querySelector('#game-box-main');
const game_box_modal_window = document.querySelector('.game-box-modal-window');
const game_box_modal_window_bottom_result = document.querySelector('.game-box-modal-window-bottom-result');
const game_box_modal_window_bottom_result_title = document.querySelector('#game-box-modal-window-bottom-result-title');
const game_box_modal_window_bottom_result_score = document.querySelector('#game-box-modal-window-bottom-result-score');
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
