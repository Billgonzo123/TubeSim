import Channels from './data/channels.js';
import Element from './elements.js';
import get from './variables.js';



let Input = {
    keypress(event) {
        let name = event.key;
        let code = event.code;
        console.log('Key Press:',  name);

        /*
        +   = Ch+
        -   = Ch-
        *   = Vol+
        /   = Vol-
        .   = Channel List
        0-9 = Enter Channel
        F5  = refresh Page (default browser key)
        */

        ///---Check if input is get.number or command key----///
        if (isNaN(name)) {
            switch (name) {
                case '+':
                case 'PageUp':
                    if (Element.listDisplayDiv.style.display == "block") { overscan(name); } else {
                        if (get.num >= Channels.length - 1) { get.num = 0; Input.refresh(); } else { get.num++; Input.refresh(); }
                    }
                    break;
                case '-':
                case 'PageDown':
                    if (Element.listDisplayDiv.style.display == "block") { overscan(name); } else {
                        if (get.num <= 0) { get.num = Channels.length - 1; Input.refresh(); } else { get.num--; Input.refresh(); }
                    }
                    break;
                case '.':
                case ',':
                case 'Backspace':
                    if (Element.listDisplayDiv.style.display === "none") { Element.chNameDisplay.style.display = "block"; Element.listDisplayDiv.style.display = 'block'; }
                    else { Element.chNameDisplay.style.display = "none"; Element.channelEntry.style.display = "none"; Element.listDisplayDiv.style.display = 'none'; }
                    Element.controlDisplay.style.display = "none";
                    break;
                case '*':
                    Input.volumeUp(name);
                    break;
                case '/':
                    Input.volumeDown(name);
                    break;
                case "ArrowUp":
                case "ArrowDown":
                case "ArrowLeft":
                case "ArrowRight":
                    if (Element.listDisplayDiv.style.display == "block") { Input.overscan(name); }
                    break;
                case "End":
                    pageData.push(get.rndEpisodenum);
                    ///and save the array to local storage (each channel gets its own local storage slot)
                    localStorage.setItem(get.num, JSON.stringify(pageData));
                    Input.refresh();
                    break;
                case "Home":
                    Input.screenOff();
                    break;
                case "Insert":
                    Input.refresh();
                    break;




            }

        }
        ///----------enter numbers for channel input--------///
        else {
            //we must clear this value if a system message is displayed (like Memory Cleared or whatever)
            if (isNaN(Element.channelEntry.textContent)) { Element.channelEntry.textContent = '' };
            Element.channelEntry.style.display = 'block';
            Element.chNameDisplay.style.display = "none";
            Element.channelEntry.textContent += name;
            name = '';
            get.n++;


            //if two numbers have been input
            if (get.n >= 2) {

                let nn = Element.channelEntry.textContent;
                //subtract one to specify array index
                nn--;

                if (nn >= Channels.length || nn < 0) {

                    //if the chList is open, some get.number inputs can be used as special commands
                    if (Element.listDisplayDiv.style.display == "block") {
                        //nn is decremented before hand so the input will be one less (ie, 99=98 or 00=-1)
                        switch (nn) {
                            case 98:
                                localStorage.removeItem(get.num);
                                Element.channelEntry.textContent = 'Channel Memory Cleared';
                                get.n = 0;
                                break;
                            case 97:
                                localStorage.clear();
                                Element.channelEntry.textContent = 'All Memory Cleared';
                                get.n = 0;
                                break;
                            case -1:
                                Element.controlDisplay.style.display = "block";
                                Element.channelEntry.textContent = '';
                                get.n = 0;
                                break;
                            default:
                                Element.channelEntry.style.display = 'none';
                                Element.channelEntry.textContent = '';
                                get.n = 0;
                                break;
                        }

                    }
                    else {
                        Element.channelEntry.style.display = 'none';
                        Element.channelEntry.textContent = '';
                        get.n = 0;
                    }
                }
                else {
                    setInterval(function () {
                        localStorage.setItem('lastChannel', nn);
                        location.reload();
                    }, 500)
                }

            }

        }



    },
    //----------------------------Check for button inputs END-----------------------------//

    //---------------------------------Fake Turn Off--------------------------------------//
    screenOff() {
        if (get.on) {
            get.on = 0;
            get.vol = 0;
            document.getElementById("soundSrc").src = "TVoff.ogg";
            Element.sound.load();
            Element.sound.play();

            //do screen off animation
            Element.static.style.animation = "powerOff .5s";
            Element.vidWindow.style.animation = "powerOff .5s";
            Element.chNameDisplay.style.display = 'none';
            let offTimer = setInterval(function () {
                Element.vidWindow.remove();
                Element.static.remove();
                clearInterval(offTimer);
            }, 450);
            //turn off
        }
        else {
            get.vol = 50;
            get.on = 1;
            //turn back on
            Input.refresh();
        }
    },
    //---------------------------------OverscanSet-----------------------------------------------//
    overscan(key) {

        switch (key) {
            case "PageUp":
                get.overscanSize += .01;
                break;

            case "PageDown":
                get.overscanSize -= .01;
                break;
            case "ArrowLeft":
                get.horShift -= 1;
                break;
            case "ArrowRight":
                get.horShift += 1;
                break;
            case "ArrowUp":
                get.verShift -= 1;
                break;
            case "ArrowDown":
                get.verShift += 1;
                break;
        }
        localStorage.setItem('overscan', get.overscanSize);
        localStorage.setItem('horizontalShift', get.horShift);
        localStorage.setItem('verticalShift', get.verShift);
        Element.vidWindow.style.transform = "scale(" + get.overscanSize + ")";
        Element.vidWindow.style.marginLeft = get.horShift + "px";
        Element.vidWindow.style.marginTop = get.verShift + "px";


    },


    //----------------------------Volume Functions START-----------------------------//
    volumeUp() {
        clearTimeout(Input.volTimeOut);
        Element.volEl.style.display = 'block';
        (get.vol>= 100) ? get.vol= 100 : get.vol+= 5;
        Element.volEl.textContent = "Volume [";
        for (let i = 0; i < (get.vol); i += 5) {
            switch (i) {
                case 45: Element.volEl.textContent += "|";
                    break;
                default: Element.volEl.textContent += "-";
                    break;
            }
        }
        Element.volEl.textContent += "]";

        Element.soundSrc.volume = (get.vol/ 100);


        localStorage.setItem('playerVolume', get.vol);
        
        hideVol();
        return;
    },

    volumeDown() {
        clearTimeout(Input.volTimeOut);
        Element.volEl.style.display = 'block';
        (get.vol <= 0) ? get.vol = 0 : get.vol -= 5;
        Element.volEl.textContent = "Volume [";
        for (let i = 0; i < (get.vol); i += 5) {
            switch (i) {
                case 45: Element.volEl.textContent += "|";
                    break;
                default: Element.volEl.textContent += "-";
                    break;
            }
        }
        Element.volEl.textContent += "]";

        Element.soundSrc.volume = (get.vol / 100);


        localStorage.setItem('playerVolume', get.vol);
        
        hideVol();
        return;
    },

    //----------------------------Volume Functions END-----------------------------//

    //----------------------------Initiate Functions-----------------------------//
    //////simply refreshes the page sfter saving the current channel////////////////
    refresh() {
        localStorage.setItem('lastChannel', get.num);
        location.reload();
    }
};

//set timeout as global variabe. Find a better way!
let volTimeOut = setTimeout(function () {
    Element.volEl.style.display = 'none';
    clearTimeout(volTimeOut);
    return;
}, 1500);

//resets volume display timout
function hideVol() {
    clearTimeout(volTimeOut);
    Element.volEl.style.display = 'block';
    volTimeOut = setTimeout(function () {
        Element.volEl.style.display = 'none';
        clearTimeout(volTimeOut);
        return;
    }, 1500);
}

export default Input;