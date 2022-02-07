

const run = {
    initElementDisplays() {
        //Hide all elements
        Element.volEl().style.display = 'none';
        Element.channelEntry().style.display = 'none';
        Element.controlDisplay().style.display = "none";
        Element.listDisplayDiv().style.display = "none";
        //Make sure the channel name is dissplayed
        Element.chNameDisplay().style.display = "block";
    },
    initiateLocalStorage() {
        ///clast ch saved here
        if (!localStorage.getItem('lastChannel') || isNaN(localStorage.getItem('lastChannel'))) { localStorage.setItem('lastChannel', 0); };
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
            Element.listDisplay().append(li);
        }
        for (let i = 15; i < Channels.length; i++) {
            let li = document.createElement('li');
            li.textContent = Channels[i].name;
            Element.listDisplay2().append(li);
        }
        const menuShortcutEl = document.createElement("p");
        menuShortcutEl.id = "menuShortcut";
        menuShortcutEl.textContent = "Enter 00 for controls";
        Element.listDisplayDiv().append(menuShortcutEl);
    },
    async checkRandomChannel() {
        //-----------CHECK IF RANDOM CHANNEL HAS BEEN GENERATED------------//

        /*This checks if the random channel has been generated before, and if it has it finds a new number.
        If there are no more random numbers to select, it clears the array of prev channels and starts over */

        //load saved prev generated channels. But first check if one exists. If it dosn't, create an empty one
        //The firat value stored is the playlist index.
        if (!localStorage.getItem(get.num)) { localStorage.setItem(get.num, JSON.stringify([0])); };

        get.pageData = JSON.parse(localStorage.getItem(get.num));
        //checks if there are any videos left in the playlist and finds the next playist if at end
        if (get.pageData.length - 1 >= Channels[get.num].episodes) { run.nextPlaylist(); }
        //check each prev ch with the current generated ch
        for (let i = 1; i < get.pageData.length; i++) {
            //if the ch has been generated before, make new number and start over (i=0)
            if (get.pageData[i] === get.rndEpisodeNum) {
                get.rndEpisodeNum = Math.floor((Math.random() * Channels[get.num].episodes));
                //start for loop over
                i = 1;
            }
        }
        return;
    },
    nextPlaylist() {
        //this runs if there are no more randum numbers to choose from
        //selects the next playlist if there is one. if not, it goes to playlist 0
        let currList = get.pageData[0];
        if (currList >= Channels[get.num].list.length - 1) {
            get.pageData = [0];
            localStorage.setItem(get.num, JSON.stringify(get.pageData));
            console.log("PLAYLIST END. RUNNING NEXT PLAYLIST FUNCTION");
            Input.refresh();
        }
        else {
            currList++;
            get.pageData = [currList];
            localStorage.setItem(get.num, JSON.stringify(get.pageData));
            console.log("PLAYLIST END. RUNNING NEXT PLAYLIST FUNCTION");
            Input.refresh();
        }



    }
};

