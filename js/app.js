const img=document.querySelector("#img-music");
const title=document.querySelector("#music-details .title");
const singer=document.querySelector("#music-details .singer");
const audio=document.querySelector("#audio");
const btnPlay=document.querySelector("#play");
const btnPrev=document.querySelector("#prev");
const btnNext=document.querySelector("#next");
const totalTime=document.querySelector(".total-time");
const currentTime=document.querySelector(".current-time");
const progressBar=document.querySelector("#progress-bar");
const volumeIcon=document.querySelector("#volume");
const volumeBar=document.querySelector("#volume-bar");
const ul=document.querySelector("#music-list");

const player=new MusicPlayer(MusicList);
document.addEventListener("DOMContentLoaded",()=>
    {
        let music=player.getMusic();
        displayMusic(music);
        displayMusicList(player.MusicList);
        isNowPlayer();
    });
    //müzikleri ilgili alana aktar
const displayMusic=(music)=>
    {
        title.textContent=music.title;
        singer.textContent=music.singer;
        img.src=`img/${music.img}`;
        audio.src=`mp3/${music.file}`;
    }

    btnPlay.addEventListener("click",()=>
        {
           const result= btnPlay.classList.contains("play");
           result?playMusic():pauseMusic();
        });

        const playMusic=()=>
            {
                audio.play();
                btnPlay.classList.remove("play");
                btnPlay.querySelector("i").className="fa-solid fa-pause";
            }
            const pauseMusic=()=>
                {
                    audio.pause();
                    btnPlay.classList.add("play");
                    btnPlay.querySelector("i").className="fa-solid fa-play";
                };
   btnNext.addEventListener("click",()=>{nextMusic(); isNowPlayer();});
   
   const nextMusic=()=>{
    player.next();
    const music=player.getMusic();
    displayMusic(music);
    playMusic();
   };
   btnPrev.addEventListener("click",()=>{prevMusic();isNowPlayer();});

   const prevMusic=()=>
{
    player.prev();
    const music=player.getMusic();
    displayMusic(music);
    playMusic();
};

const calculateTime=(time)=>
    {
        let minute=Math.floor(time/60);
        let second=Math.floor(time%60);
        let updateSecond=second<10?`0${second}`:`${second}`;
        return `${minute}:${updateSecond}`;
    };
audio.addEventListener("loadedmetadata",()=>
    {
        totalTime.textContent=calculateTime(audio.duration);
        progressBar.max=Math.floor(audio.duration);
    });

audio.addEventListener("timeupdate",()=>
{
    progressBar.value=Math.floor(audio.currentTime);
    currentTime.textContent=calculateTime(audio.currentTime);
});

progressBar.addEventListener("input",()=>{
    currentTime.textContent=Math.floor(progressBar.value);
    audio.currentTime=progressBar.value;
;});

let stateVolume="sesli";

volumeIcon.addEventListener("click",()=>
{
    if(stateVolume==="sesli")
        {
            audio.muted=true;
            stateVolume="sessiz";
            volumeIcon.className="fa-solid fa-volume-xmark me-2";
            volumeBar.value=0;
        }
        else
        {
            stateVolume="sesli"
            volumeIcon.className="fa-solid fa-volume-high me-2";
            audio.muted=false;
            volumeBar.value=100;
        }
});

volumeBar.addEventListener("input",(e)=>
    {
        const result=(e.target.value)/100;
       audio.volume=result;
       if(result==0)
        {
            volumeIcon.className="fa-solid fa-volume-xmark me-2";
            audio.muted=false;
            stateVolume="sesli";
        }
        else
        {
            audio.muted=false;
            volumeIcon.className="fa-solid fa-volume-high me-2";
            stateVolume="sessiz";
        }
    });

const displayMusicList=(List)=>
{
    for(let i=0;i<List.length;i++)
        {
            let liTag=` <li li-index=${i} onclick="selectedMusic(this)" class="list-group-item d-flex align-items-center justify-content-between my-2 border-bottom">
                        <img src="img/${List[i].img}" class="rounded-circle" style="height: 60px;width: 60px;">
                        <p>${List[i].title}</p>
                        <audio class="music-${i}" src="mp3/${List[i].file}"></audio>
                        <div id="music-${i}" class="badge bg-primary"></div>
                         
                    </li>`

                    ul.insertAdjacentHTML("beforeend",liTag);

                    let liAudioDuration=ul.querySelector(`#music-${i}`);
                    let liAudioTag=ul.querySelector(`.music-${i}`);

                    liAudioTag.addEventListener("loadeddata",()=>
                        {
                           
                            liAudioDuration.textContent=calculateTime(liAudioTag.duration);
                        });
                        
        }
}

const selectedMusic=(itemLi)=>
{
    let li=itemLi.getAttribute("li-index");
    player.index=li;
    displayMusic(player.getMusic());
    playMusic();
    isNowPlayer();
};

const isNowPlayer=()=>
{
    
    for(let li of ul.querySelectorAll("li"))
        {
            if(li.classList.contains("selected"))
                {
                    li.classList.remove("selected");
                }
            
            if(li.getAttribute("li-index")==player.index)
                {
                    li.classList.add("selected");
                }
        }
};

audio.addEventListener("ended",()=>
    {
        player.next();
        displayMusic(player.getMusic());
        playMusic();
        isNowPlayer();
    });