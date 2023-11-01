console.log("WELCOME TO GUNGUNAO");
let html = '';
songs.forEach((element, i) => {
    html += `<div class="songItem">
    <img id="igu" src="cover/${i + 1}.jpg" alt="UUFFFF!">
    <span class="songName">${songs[i].songName}</span>
    <span class="songListPlay"><span class="timestamp"><span class="ts"></span><i class='songItemPlay bx bx-play'></i></span><span></span></span>
</div>`;
    console.log(songs[i], i);
})
document.querySelector(".sdad").innerHTML = html;
let songItems = Array.from(document.getElementsByClassName('songItem'));
songItems.forEach((element, i) => {
    let aud = new Audio(songs[i].filePath);
    aud.addEventListener('loadeddata', () => {
        let a = parseInt(aud.duration % 60);
        if (a < 10)
            a = `0${a}`;
        element.getElementsByClassName("ts")[0].innerText = `${parseInt((aud.duration / 60) % 60)}:${a}`;
    })
})
let audioElement = new Audio('song/1.mp3');
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
masterPlay.addEventListener('click', () => {
    makeAllPlays(songIndex);
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.add('bx-pause');
        masterPlay.classList.remove('bx-play');
        gif.style.opacity = 1;
    }
    else {
        gif.style.opacity = 0;
        audioElement.pause();
        masterPlay.classList.remove('bx-pause');
        masterPlay.classList.add('bx-play');
    }
})
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    if (audioElement.currentTime == audioElement.duration) {
        if (songIndex < 9)
            songIndex += 1;
        else {
            songIndex = 0;
        }
        makeAllPlays(songIndex);
        gif.style.opacity = 1;
        audioElement.currentTime = 0;
        audioElement.pause();
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        masterPlay.classList.add('bx-pause');
        masterPlay.classList.remove('bx-play');
    }
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 10000);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 10000;
})
function makeAllPlays(i) {
    document.getElementById("hihih").innerText = songs[i].songName;
    songIndex = i;
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('bx-pause');
        element.classList.add('bx-play');
    })
    gif.style.opacity = 1;
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('bx-play');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('bx-pause');
};
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays(i);
        e.target.classList.remove('bx-play');
        e.target.classList.add('bx-pause');
        audioElement.src = songs[i].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.add('bx-pause');
        masterPlay.classList.remove('bx-play');
    })
})
Array.from(document.getElementsByClassName('songName')).forEach((element, i) => {
    element.addEventListener('click', () => {
        makeAllPlays(i);
        audioElement.src = songs[i].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.add('bx-pause');
        masterPlay.classList.remove('bx-play');
    })
})
document.getElementById("next").addEventListener('click', () => {
    if (songIndex < 19)
        songIndex += 1;
    else {
        songIndex = 0;
    }
    makeAllPlays(songIndex);
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.pause();
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    masterPlay.classList.add('bx-pause');
    masterPlay.classList.remove('bx-play');
});

document.getElementById("prev").addEventListener('click', () => {
    if (songIndex > 0)
        songIndex -= 1;
    else
        songIndex = 19;
    makeAllPlays(songIndex);
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.pause();
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    masterPlay.classList.add('bx-pause');
    masterPlay.classList.remove('bx-play');
})