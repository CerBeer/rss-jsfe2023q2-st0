
const animals = [
    './assets/svg/no_image.svg',
    './assets/svg/animal/zebra.svg',
    './assets/svg/animal/bear.svg',
    './assets/svg/animal/boar.svg',
    './assets/svg/animal/cow.svg',
    './assets/svg/animal/crab.svg',
    './assets/svg/animal/crocodile.svg',
    './assets/svg/animal/dinosaur.svg',
    './assets/svg/animal/elk.svg',
    './assets/svg/animal/fox.svg',
    './assets/svg/animal/lion.svg',
    './assets/svg/animal/penguin.svg',
    './assets/svg/animal/rabbit.svg',
    './assets/svg/animal/raccoon.svg',
    './assets/svg/animal/shrimp.svg',
    './assets/svg/animal/squirrel.svg',
    './assets/svg/animal/whale.svg'
];

const fruits = [
    './assets/svg/no_image.svg',
    './assets/svg/food/strawberry.svg',
    './assets/svg/food/watermelon.svg',
    './assets/svg/food/apple.svg',
    './assets/svg/food/banana.svg',
    './assets/svg/food/cherry.svg',
    './assets/svg/food/hawthorn.svg',
    './assets/svg/food/peach.svg',
    './assets/svg/food/pineapple.svg',
    './assets/svg/food/grape.svg',
    './assets/svg/food/avocado.svg',
    './assets/svg/food/kiwi.svg',
    './assets/svg/food/lemon.svg',
    './assets/svg/food/corn.svg',
    './assets/svg/food/carrot.svg',
    './assets/svg/food/ice-cream.svg',
    './assets/svg/food/pear.svg',
]

const noImage = './assets/svg/no_image.svg';

const game_states = {
    stop: 'stop',
    game: 'game',
    pause: 'pause',
    end: 'end',
    won: 'won'
}

const figure_states = {
    empty: 'empty',
    stand: 'stand',
    blast: 'blast'
}

const game_sounds = {
    change: new Audio('./assets/sounds/change.mp3'),
    boom: new Audio('./assets/sounds/boom.mp3'),
    fall: new Audio('./assets/sounds/fall.mp3'),
    newup: new Audio('./assets/sounds/newup.mp3')
}

const game_box_main_gameboard_board = document.querySelector('#game-box-main-gameboard-board');
const buttons_blinkspeed_plus = document.querySelector('#game-box-top-hr-speed-plus');
const buttons_blinkspeed_minus = document.querySelector('#game-box-top-hr-speed-minus');
const buttons_blinkspeed_counter = document.querySelector('#game-box-top-hr-speed-counter');

const game_numberChangesButtons = [];
//total different shapes available
const game_numberFigures = fruits.length;
const game_pool_width = 6;
const game_pool_height = 8;
const game_blinkspeed_max = 3;
const game_blinkspeed_min = 0;
const game_blinkspeed_timeout_step = 500;
//pause between changes in the visual representation of figures so that the previous animation has time to work out
const game_image_update_timeout = 400;

let board_state = [];
let game_timer;
let game_state, game_numberFigures_current;
let game_blinkspeed_current, game_blinkspeed_timeout, game_gameboard_autochange;
let game_sound_enabled, game_sound_volume;
let board_state_calc, game_states_recast;
let game_score_total, game_score_level, game_score_figure, game_score_multiplier, game_score_multiplier_next, game_score_multiplier_current;
let game_time_left, game_time_full, game_time_step, game_time_figure, game_time_level_up;
let game_level, game_level_max, game_level_step_countFigure;
