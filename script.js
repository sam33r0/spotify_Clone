console.log("WELCOME TO GUNGUNAO");
const songs=[
    {songName: 'Heeriye', filePath: 'song/1.mp3', coverPath: 'cover/1.jpg'},
    {songName: 'Kalastar', filePath: 'song/2.mp3', coverPath: 'cover/2.jpg'},
    {songName: 'Kya Loge Tum', filePath: 'song/3.mp3', coverPath: 'cover/3.jpg'},
    {songName: 'Maan Meri Jaan', filePath: 'song/4.mp3', coverPath: 'cover/4.jpg'},
    {songName: 'Phir Aur Kya Chahiye', filePath: 'song/5.mp3', coverPath: 'cover/5.jpg'},
    {songName: 'Pyaar Hota Kayi Baar Hai', filePath: 'song/6.mp3', coverPath: 'cover/6.jpg'},
    {songName: 'Savage -YOYO Honey Singh', filePath: 'song/7.mp3', coverPath: 'cover/7.jpg'},
    {songName: 'Tere Pyar Mein', filePath: 'song/8.mp3', coverPath: 'cover/8.jpg'},    
    {songName: 'Tune Jo Na Kaha', filePath: 'song/9.mp3', coverPath: 'cover/9.jpg'},
    {songName: 'Raam Siya Raam', filePath: 'song/10.mp3', coverPath: 'cover/10.jpg'}
];
let songItems=Array.from(document.getElementsByClassName('songItem'));
songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
    let aud=new Audio(songs[i].filePath);
    aud.addEventListener('loadeddata',()=>{
        element.getElementsByClassName("ts")[0].innerText=`${parseInt((aud.duration/60)%60)}:${parseInt(aud.duration%60)}`;
    })
})
let audioElement =new Audio('song/1.mp3');
let songIndex=0;
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
masterPlay.addEventListener('click',()=>{
    makeAllPlays(songIndex);
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.add('bx-pause');
        masterPlay.classList.remove('bx-play');
        gif.style.opacity= 1;
    }
    else
    {
        gif.style.opacity = 0;
        audioElement.pause();
        masterPlay.classList.remove('bx-pause');
        masterPlay.classList.add('bx-play');
    }
})
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    if(audioElement.currentTime==audioElement.duration)
    {
        if(songIndex<9)
        songIndex+=1;
        else{
            songIndex=0;
        }
        makeAllPlays(songIndex); 
        gif.style.opacity= 1;
        audioElement.currentTime=0;
        audioElement.pause();
        audioElement.src=songs[songIndex].filePath;
        audioElement.play();
        masterPlay.classList.add('bx-pause');
        masterPlay.classList.remove('bx-play');
        }
        progress= parseInt((audioElement.currentTime/audioElement.duration)*10000);
        myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= (myProgressBar.value*audioElement.duration)/10000;
})
function makeAllPlays(i){
    document.getElementById("hihih").innerText=songs[i].songName;
    songIndex=i;
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element )=>{
        element.classList.remove('bx-pause');
        element.classList.add('bx-play');
    })  
    gif.style.opacity= 1;
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('bx-play');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('bx-pause');
};
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element , i )=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays(i);
        e.target.classList.remove('bx-play');
        e.target.classList.add('bx-pause');
        audioElement.src=songs[i].filePath;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.add('bx-pause');
        masterPlay.classList.remove('bx-play');        
    })
})
document.getElementById("next").addEventListener('click',()=>
{
    if(songIndex<9)
    songIndex+=1;
    else{
        songIndex=0;
    }
    makeAllPlays(songIndex); 
    gif.style.opacity= 1;
    audioElement.currentTime=0;
    audioElement.pause();
    audioElement.src=songs[songIndex].filePath;
    audioElement.play();
    masterPlay.classList.add('bx-pause');
    masterPlay.classList.remove('bx-play');  
});
document.getElementById("prev").addEventListener('click',()=>{
    if(songIndex>0)
    songIndex-=1;
    else
    songIndex=9;
    makeAllPlays(songIndex); 
    gif.style.opacity= 1;
    audioElement.currentTime=0;
    audioElement.pause();
    audioElement.src=songs[songIndex].filePath;
    audioElement.play();
    masterPlay.classList.add('bx-pause');
    masterPlay.classList.remove('bx-play'); 
})