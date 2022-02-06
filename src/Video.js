import run from './Functions.js';
import Channels from './data/Channels.js';
import Element from './Elements.js';
import get from './Variables.js';
import Input from './Input.js';


function Video() {
    console.log('Video function initiated!');
    
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads./////////////////////
    
    function onYouTubeIframeAPIReady() {
        console.log('API ready!');
        let epNum = get.rndEpisodeNum;
        let player = new YT.Player("player", {
            height: '480',
            width: '720',
            host: 'http://www.youtube-nocookie.com',
            playerVars: {
                start: get.beginPlace,
                controls: 0,
                modestbranding: 1,
                listType: 'playlist',
                list: Channels[get.num].list[get.pageData[0]],
                index: epNum + 1, //this always subtracts one
                // loop: 1, //llops the playlist
                autoplay: true,
                mute: 0,

            },

            events: {

                'onReady': videoStart,

                'onStateChange': stateChange
            }
        });


    }
   
}

function videoStart(event) {
    console.log('VIDEO START??');
    event.target.playVideo();
    Element.vidWindow = document.querySelector('#player');
    get.overscanSize = parseFloat(localStorage.getItem('overscan'));
    Element.vidWindow.style.transform = "scale(" + overscanSize + ")";
    Element.vidWindow.style.marginLeft = horShift + "px";
    Element.vidWindow.style.marginTop = verShift + "px";
    
    Element.vidWindow.style.display = "block";
    //////////hide static and pause//////////////////
    document.getElementById("staticImage").style.display = "none";
    event.target.playVideo();sound.pause();

    console.log("RndNumber: ", rndEpisodeNum, "realEpNumber: ", epNum);
    console.log("Ep running: ", player.getPlaylistIndex());
    ///check if all videos played
    if (get.pageData.length - 1 >= Channels[get.num].episodes) {
        run.nextPlaylist();
    }
    //if the video is unavailable or blocked index will return -1
    if (player.getPlaylistIndex() < 0) {
        //if video is an error, push the index number represented my rndEpisodeNum-1
        //this only works with a newly random generated item
        get.pageData.push(get.epNum);
        ///and save the array to local storage (each channel gets its own local storage slot)
        localStorage.setItem(get.num, JSON.stringify(get.pageData));
        if (!(get.pageData.length > Channels[get.num].episodes)) {
            Input.refresh();
        } else {
            Element.channelEntry.style.whiteSpace = "pre";
            Element.channelEntry.textContent = "Reset Channel Memory!\nEnter 99 at Channel List";
            Element.channelEntry.style.display = "block";
        }


    }

    //update vol every 100 ms
    setInterval(function () {
        //constat update of volume
        event.target.setVolume(get.vol);

    }, 100)



    let k = setTimeout(function () {
        get.epNum = player.getPlaylistIndex();
        // event.target.setShuffle({ 'shufflePlaylist': true });

        /*This calculates the video length and finds how many times the value is divisible by 10 mins (600s)*/
        //legnth is seconds
        let vidLength = Math.floor((player.getDuration()));
        //HOW MANY 15 MIN SLOTS EXISTS
        let multi = Math.floor((vidLength / 600));
        //A RANDOM NUM FOR A 15 MION SLOT 
        let rnd = Math.floor(Math.random() * (multi));
        /*Then we check if the selected channel wants to be set to a random point with randPoint = true
        and finds a random spot in the video in increments of 10mins (600s)*/
        if (Channels[get.num].randPoint) { get.beginPlace = rnd * 600; }
        /*Then we apply that value to the vidoe player via "seekTo()".
         beginPlace default value is 0  so if randPoint isnt set it just starts at the beginning of the video*/
        player.seekTo(beginPlace, true);
        clearTimeout(k);

    }, 1000);
}
function stateChange(){
    console.log(Channels[get.num].episodes);
    console.log("original Rnd Ch: ", get.rndEpisodeNum);
    console.log("Last Ep: ", player.getPlaylistIndex() - 1, get.epNum);
    console.log("New Ep: ", player.getPlaylistIndex());




    //checks if current episode is the last in the playlist and sets flag if true
    //  if (player.getPlaylistIndex() === channel[num].episodes){ lastInPlaylist = 1; console.log('This is the lastepisode in playlist');}
    if (player.getPlayerState() == 0) {
        console.log("Playlist ended");
        pageData.push(player.getPlaylistIndex());

        ///and save the array to local storage (each channel gets its own local storage slot)
        localStorage.setItem(get.num, JSON.stringify(get.pageData));
        Input.refresh();
    }
    ///epNum keeps track of episode updates
    if (get.epNum < player.getPlaylistIndex()) {

        get.epNum = player.getPlaylistIndex();
        //waits for 2secs before saving prev video to let player have time to switch states
        let j = setTimeout(function () {
            //add last episode to watched list array (pageData)
            get.pageData.push(player.getPlaylistIndex() - 1);

            ///and save the array to local storage (each channel gets its own local storage slot)
            localStorage.setItem(get.num, JSON.stringify(get.pageData));

            for (let i = 1; i < get.pageData.length; i++) {
                //if the ch has been generated before, make new number and start over (i=0)
                if (get.pageData[i] === player.getPlaylistIndex()) {
                    Input.refresh();
                }
            }

            //checks if rndEpisodeNum is the last possible number and resets the array if it is
            if (get.pageData.length - 1 >= Channels[get.num].episodes) {
                run.nextPlaylist()

            }
            clearTimeout(j);
        }, 500);
    }
}

export default Video;
