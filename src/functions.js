import Channels from './data/channels.js';
import Element from './elements.js';
import get from './variables.js';

const run = {
    initElementDisplays() {
        //Hide all elements
        Element.volEl.style.display = 'none';
        Element.channelEntry.style.display = 'none';
        Element.controlDisplay.style.display = "none";
        Element.listDisplayDiv.style.display = "none";
        //Make sure the channel name is dissplayed
        Element.chNameDisplay.style.display = "block";
    },
    initiateLocalStorage() {
        ///clast ch saved here
        if (!localStorage.getItem('lastChannel')) { localStorage.setItem('lastChannel', 0); };
        ///volume and other data saved here
        if (!localStorage.getItem('playerVolume')) { localStorage.setItem('playerVolume', 50); };

        if (!localStorage.getItem('overscan')) { localStorage.setItem('overscan', 1); };
        if (!localStorage.getItem('horizontalShift')) { localStorage.setItem('horizontalShift', 0); };
        if (!localStorage.getItem('verticalShift')) { localStorage.setItem('verticalShift', 0); };
        
    },
    populateChannelList() {
        for (let i = 0; i < 15; i++) {
            let li = document.createElement('li');
            li.textContent = Channels[i].name;
            Element.listDisplay.append(li);
        }
        for (let i = 15; i < Channels.length; i++) {
            let li = document.createElement('li');
            li.textContent = Channels[i].name;
            Element.listDisplay2.append(li);
        }
    }
};

export default run;