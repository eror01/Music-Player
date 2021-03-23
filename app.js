const musicContainer = document.querySelector('.music__container');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const audio = document.querySelector('.audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress__container');
const title = document.querySelector('.title');
const cover = document.querySelector('.cover');

const songs = ['Arabella', 'Believer', 'Human', 'Stressedout'];

let songIndex = 0;

// Load song details into DOM
loadSong(songs[songIndex]);


function loadSong(song){
    title.innerText = song;
    audio.src = `Music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Play song
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('span.fas').classList.remove('fa-play');
    playBtn.querySelector('span.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('span.fas').classList.add('fa-play');
    playBtn.querySelector('span.fas').classList.remove('fa-pause');

    audio.pause();
}

function nextSong(){
    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Update progress bar
function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

   audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () =>{
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    } else {
        playSong();
    }
})
// Change the song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

// song ends
audio.addEventListener('ended', nextSong);