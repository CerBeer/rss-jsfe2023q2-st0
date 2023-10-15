
const marker_timeBar = document.getElementById("game-box-main-time-volume");
const marker_timeDigit = document.getElementById("game-box-main-time-digit");
const marker_scoreBar = document.getElementById("game-box-main-score-volume");
const marker_scoreDigit = document.getElementById("game-box-main-score-digit");
const marker_levelValue = document.getElementById("game-box-top-hr-level-value");
const marker_totalScoreValue = document.getElementById("game-box-top-hr-totalscore-value");

function game_set_markers_state() {
    marker_timeBar.style.height = `${(game_time_left * 100) / game_time_full}%`;
    marker_timeDigit.innerText = game_time_minutes(game_time_left);
    let scoreBar_style_height = (game_score_level * 100) / game_score_level_full;
    if (scoreBar_style_height > game_score_level_full) {
        scoreBar_style_height = game_score_level_full;
    }
    marker_scoreBar.style.height = `${scoreBar_style_height}%`;
    marker_scoreDigit.innerText = game_score_level;

    marker_levelValue.innerText = `Level:\n${game_level}`;
    marker_totalScoreValue.innerText = `Total score:\n${game_score_total}`;
}

function game_time_minutes(time_in_seconds) {
    const minutes = `00${Math.floor(time_in_seconds / 60)}`.slice(-2);
    const seconds = `00${time_in_seconds % 60}`.slice(-2);
    return `${minutes}:${seconds}`;
}
