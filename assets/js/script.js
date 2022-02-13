
run.initiateLocalStorage();
//populated the channel list elements with the channel names by number
run.populateChannelList();
//initiate elements displays to none or block
run.initElementDisplays();


//---------------main app init--------------//
async function app() {
    
    //set channel name to current channel
    Element.chNameDisplay().textContent = Channels[get.num].name ;
    const firstTime = JSON.parse(localStorage.getItem('firstTime'));

    if (!firstTime) {
        Element.chNameDisplay().textContent += ` -- Press "." for Menu -- `;
    }
    //set static volume based on volume value
    Element.sound().volume = (get.vol / 100);
    //timer for chNameDisplay
    //Because a channel change is handled with a page refresh, this runs in the main code
    let chNameDisplayTimer = setInterval(
        function () {
            //set firsTime to 1
            localStorage.setItem('firstTime', 1);
            Element.chNameDisplay().textContent = Channels[get.num].name;
            Element.chNameDisplay().style.display = "none";
            clearInterval(chNameDisplayTimer);
        }
        , 8000);

    //generate a random episode based off of Channel[num].episodes
    get.rndEpisodeNum = Math.floor((Math.random() * Channels[get.num].episodes));
    await run.checkRandomChannel().then(() => console.log('new video number selected'));

    //if the current channel numbner isnt saved in local storage, add it
    if (!localStorage.getItem(get.num)) { localStorage.setItem(get.num, JSON.stringify([0])); };


    //-------------------------------temp console logs to check values------------------------//
    console.log('Channels List: ', Channels)
    console.log('Last channel watched before shutdown: ', get.num)
    console.log("Rand Ep: ", get.rndEpisodeNum)
    console.log('Volume set to: ', get.vol)

    //play video
    console.log('Now attempting to run video player')
    Video();

}

//event listener for keypress
document.addEventListener('keydown', Input.keypress)

app();










