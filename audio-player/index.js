
const track = document.getElementById("track");
const cover = document.getElementById("cover");
const background = document.getElementById("background");
const infoArtist = document.getElementById("info-artist");
const infoTitle = document.getElementById("info-title");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("durationTime");
const volumeBar = document.getElementById("volumeBar");

const prev = document.getElementById("prev");
const play_pause = document.getElementById("play-pause");
const next = document.getElementById("next");

tracks = [
    "./assets/audio/rock.mp3",
    "./assets/audio/EnergeticRock.mp3",
    "./assets/audio/AnotherLevel.mp3"
];
covers = [
    "./assets/audio/images/rock.png",
    "./assets/audio/images/EnergeticRock.png",
    "./assets/audio/images/AnotherLevel.png"
];
infoArtists = [
    "MokkaMusic",
    "MokkaMusic",
    "CRMNL"
];
infoTitles = [
    "(No Copyright Music) Sport Trailer Rock",
    "(No Copyright Music) Energetic Rock",
    "Another Level"
];

function setState() {
    track.src = tracks[trackIndex];
    cover.src = covers[trackIndex];
    background.src = covers[trackIndex];

    infoArtist.textContent = infoArtists[trackIndex];
    infoTitle.textContent = infoTitles[trackIndex];

    setAudioState();
}

function setAudioState() {
    if (playNow) {
        play_pause.classList.add("music-payer-control-box-buttons-play-pause-pause");
        cover.style.transform = "scale(1.25)";
        track.volume = volume;
        track.play();
    } else {
        play_pause.classList.remove("music-payer-control-box-buttons-play-pause-pause");
        cover.style.transform = "scale(1)";
        track.pause();
    }
    volumeBar.value = Math.floor(volume * 100);
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
    setState();
}

function setPrev() {
    trackIndex--;
    if (trackIndex < 0) {
        trackIndex = tracks.length - 1;
    }
    playNow = true;
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
}

let playNow = false;
let trackIndex = 0;
let volume = 0.02;

play_pause.addEventListener("click", playPause);
next.addEventListener("click", setNext);
prev.addEventListener("click", setPrev);

track.addEventListener("ended", setNext);

volumeBar.addEventListener("click", changeVolumeBar);
progressBar.addEventListener("click", changeProgressBar);

setInterval(progressValue, 500);

setState();
