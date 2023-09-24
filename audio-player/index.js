
const track = document.getElementById("track");
const cover = document.getElementById("cover");
const background = document.getElementById("background");
const infoArtist = document.getElementById("info-artist");
const infoTitle = document.getElementById("info-title");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("durationTime");
const volumeBar = document.getElementById("volumeBar");
const volumeIcon = document.getElementById("volumeIcon");

const prev = document.getElementById("prev");
const play_pause = document.getElementById("play-pause");
const next = document.getElementById("next");

const tracks = [
    "./assets/audio/rock.mp3",
    "./assets/audio/EnergeticRock.mp3",
    "./assets/audio/AnotherLevel.mp3"
];
const covers = [
    "./assets/audio/images/rock.png",
    "./assets/audio/images/EnergeticRock.png",
    "./assets/audio/images/AnotherLevel.png"
];
const infoArtists = [
    "MokkaMusic",
    "MokkaMusic",
    "CRMNL"
];
const infoTitles = [
    "(No Copyright Music) Sport Trailer Rock",
    "(No Copyright Music) Energetic Rock",
    "Another Level"
];

let playNow = false;
let trackIndex = 0;

let muteNow = false;
volumeBar.value = 2;

function localStorage_init() {
    let keys = Object.keys(localStorage);
    if (keys.indexOf('trackIndex') < 0) localStorage.setItem('trackIndex', trackIndex);
    if (keys.indexOf('volume') < 0) localStorage.setItem('volume', volumeBar.value);
}

function localStorage_saveVars() {
    localStorage.setItem('trackIndex', trackIndex);
    localStorage.setItem('volume', volumeBar.value);
}

function localStorage_readVars() {
    trackIndex = localStorage.trackIndex;
    volumeBar.value = localStorage.volume;
}

function setState() {
    track.src = tracks[trackIndex];
    cover.src = covers[trackIndex];
    background.src = covers[trackIndex];

    infoArtist.textContent = infoArtists[trackIndex];
    infoTitle.textContent = infoTitles[trackIndex];

    setAudioState();
    setVolumeState();
}

function setAudioState() {
    if (playNow) {
        play_pause.classList.add("music-payer-control-box-buttons-play-pause-pause");
        cover.style.transform = "scale(1.25)";
        track.play();
    } else {
        play_pause.classList.remove("music-payer-control-box-buttons-play-pause-pause");
        cover.style.transform = "scale(1)";
        track.pause();
    }
}

function setVolumeState() {
    if (muteNow) {
        volumeIcon.classList.add("music-payer-control-box-progress-bar-volumeIcon-mute");
        track.volume = 0;
    } else {
        volumeIcon.classList.remove("music-payer-control-box-progress-bar-volumeIcon-mute");
        track.volume = volumeBar.value / 100;
    }
}

function playPause() {
    playNow = !playNow;
    setAudioState();
}

function setNext() {
    trackIndex++;
    if (trackIndex > tracks.length - 1) {
        trackIndex = 0;
    }
    playNow = true;
    localStorage_saveVars();
    setState();
}

function setPrev() {
    trackIndex--;
    if (trackIndex < 0) {
        trackIndex = tracks.length - 1;
    }
    playNow = true;
    localStorage_saveVars();
    setState();
}

function progressValue() {
    progressBar.max = track.duration;
    progressBar.value = track.currentTime;

    currentTime.textContent = formatTime(track.currentTime);
    durationTime.textContent = formatTime(track.duration);
}

function formatTime(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec - (minutes * 60));
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

function changeProgressBar() {
    track.currentTime = progressBar.value;
}

function changeVolumeBar() {
    track.volume = volumeBar.value / 100;
    muteNow = (volumeBar.value < 0.1);
    localStorage_saveVars();
    setVolumeState();
}

function muteVolume() {
    muteNow = !muteNow;
    if ((!muteNow) && (volumeBar.value < 0.1)) volumeBar.value = 1;
    setVolumeState();
}

play_pause.addEventListener("click", playPause);
next.addEventListener("click", setNext);
prev.addEventListener("click", setPrev);

track.addEventListener("ended", setNext);

volumeBar.addEventListener("click", changeVolumeBar);
volumeIcon.addEventListener("click", muteVolume);
progressBar.addEventListener("click", changeProgressBar);

setInterval(progressValue, 500);

localStorage_init();
localStorage_readVars();

setState();
