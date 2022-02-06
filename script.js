//import all modules
import run from './src/Functions.js';
//initLocal storage must be run first as some modules depend on localstorage values
run.initiateLocalStorage();
import Channels from './src/data/Channels.js';
import Element from './src/Elements.js';
import get from './src/Variables.js';
import Input from './src/Input.js';
import Video from './src/Video.js'
//populated the channel list elements with the channel names by number
run.populateChannelList();
//initiate elements displays to none or block
run.initElementDisplays();

function app() {
    //-----------Main code block------------//
    //set channel name to current channel
    Element.chNameDisplay.textContent = Channels[get.num].name;
    //set static volume based on volume value
    Element.sound.volume = (get.vol / 100);
    //timer for chNameDisplay
    //Because a channel change is handled with a page refresh, this runs in the main code
    let chNameDisplayTimer = setInterval(
        function () {

            Element.chNameDisplay.style.display = "none";
            clearInterval(chNameDisplayTimer);
        }
        , 8000);

    //generate a random episode based off of Channel[num].episodes
    get.rndEpisodeNum = Math.floor((Math.random() * Channels[get.num].episodes));
   run.checkRandomChannel();

    //if the current channel numbner isnt saved in local storage, add it
    if (!localStorage.getItem(get.num)) { localStorage.setItem(get.num, JSON.stringify([0])); };


        //-------------------------------temp console logs to check values------------------------//
console.log('Channels List: ', Channels)
console.log('Last channel watched before shutdown: ', get.num)
console.log("Rand Ep: ", get.rndEpisodeNum)
console.log('Volume set to: ', get.vol)

    //run youtube API function
    Video();
}





//event listener for keypress
document.addEventListener('keydown', Input.keypress)

app();


