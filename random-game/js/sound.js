const buttons_volumeBar = document.getElementById("game-box-top-hr-left-volumeBar");
const buttons_volumeIcon = document.getElementById("game-box-top-hr-left-volumeIcon");

buttons_volumeBar.addEventListener("click", game_changeVolumeBar);
buttons_volumeIcon.addEventListener("click", game_muteVolume);

function game_set_volume_state() {
    buttons_volumeBar.value = game_sound_volume * 100;
    if (game_sound_enabled) {
        buttons_volumeIcon.classList.remove("game-box-top-hr-left-volumeIcon-mute");
        buttons_volumeIcon.classList.add("game-box-top-hr-left-volumeIcon");
    } else {
        buttons_volumeIcon.classList.add("game-box-top-hr-left-volumeIcon-mute");
        buttons_volumeIcon.classList.remove("game-box-top-hr-left-volumeIcon");
    }
}

function game_changeVolumeBar() {
    game_sound_volume = buttons_volumeBar.value / 100;
    game_sound_enabled = (buttons_volumeBar.value > 2);
    game_set_volume_state();
}

function game_muteVolume() {
    game_sound_enabled = !game_sound_enabled;
    game_set_volume_state();
}

function game_playSound(sound) {
    if (!game_sound_enabled) return;
    sound.volume = game_sound_volume;
    sound.play();
}
