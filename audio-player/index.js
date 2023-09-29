
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

// #self-esteemate

let self_esteem = 'Self-assessment of work: 70 points \n \
\n \
1. Layout +10 \n \
 + audio player layout: there is a Play/Pause button, “Forward” and “Back” buttons for scrolling through audio tracks, a progress bar, displaying the title and author of the track +5 \n \
 + in the footer of the application there is a link to the GitHub of the author of the application, the year the application was created, the course logo with a link to the course +5 \n \
2. Play/Pause button +10 \n \
 + there is a Play/Pause button, when you click on it you can start or stop playing an audio track +5 \n \
 + The appearance and functionality of the Play/Pause button changes depending on whether an audio track is currently playing +5 \n \
3. Pressing the “Forward” and “Back” buttons switches the audio track being played. Audio tracks are scrolled in a circle - after the last one comes the first +10 \n \
4. When changing the audio track, the image changes - audio track cover +10 \n \
5. The progress bar displays the progress of playing a modern audio track. When moving the slider manually, it changes the current playing time of the audio track +10 \n \
6. Displays the duration of the audio track and its current playing time +10 \n \
7. Additional functionality not provided for in the task that improves the quality of the application +10 \n \
 + Added volume control. \n \
 + Added saving of the last playing track and volume level when reloading the page.';
console.log(self_esteem);

// #self-esteemate

