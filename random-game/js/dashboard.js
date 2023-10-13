
const marker_timeBar = document.getElementById("game-box-main-time-volume");
const marker_timeDigit = document.getElementById("game-box-main-time-digit");
const marker_scoreBar = document.getElementById("game-box-main-score-volume");
const marker_scoreDigit = document.getElementById("game-box-main-score-digit");

function game_set_markers_state() {
    marker_timeBar.style.height = `${(game_time_left * 100) / game_time_full}%`;
    marker_timeDigit.innerText = game_time_minutes(game_time_left);
    marker_scoreBar.style.height = `${(game_score_level * 100) / game_score_level_full}%`;
    marker_scoreDigit.innerText = game_score_level;
}

function game_time_minutes(time_in_seconds) {
    const minutes = `00${Math.floor(time_in_seconds / 60)}`.slice(-2);
    const seconds = `00${time_in_seconds % 60}`.slice(-2);
    return `${minutes}:${seconds}`;
}
