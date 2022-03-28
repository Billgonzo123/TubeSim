
const InputFunction = 
{
    //---------------------------------Fake Turn Off--------------------------------------//
    screenOff() {
        if (get.on) {
            get.on = 0;
            get.vol = 0;
            document.getElementById("soundSrc").src = "./assets/sound/TVoff.ogg";
            Element.sound().load();
            Element.sound().play();

            //do screen off animation
            Element.static().style.animation = "powerOff .5s";
            Element.vidWindow().style.animation = "powerOff .5s";
            Element.chNameDisplay().style.display = 'none';
            let offTimer = setInterval(function () {
                Element.vidWindow().remove();
                Element.static().remove();
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
    //---------------------------------OverscanSet-----------------------------------//
    overscan(key) {

        switch (key) {
            case "+":
            case "PageUp":
                get.overscanSize += .01;
                break;

            case "-":
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

        
        Element.vidWindow().style.transform = "scale(" + get.overscanSize + ")";
        Element.vidWindow().style.marginLeft = get.horShift + "px";
        Element.vidWindow().style.marginTop = get.verShift + "px";
        localStorage.setItem('overscan', get.overscanSize);
        localStorage.setItem('horizontalShift', get.horShift);
        localStorage.setItem('verticalShift', get.verShift);


    },


    //----------------------------Volume Functions START-----------------------------//
    volumeUp() {
        clearTimeout(Input.volTimeOut);
        Element.volEl().style.display = 'block';
        (get.vol >= 100) ? get.vol = 100 : get.vol += 5;
        Element.volEl().textContent = "Volume [";
        for (let i = 0; i < (get.vol); i += 5) {
            switch (i) {
                case 45: Element.volEl().textContent += "|";
                    break;
                default: Element.volEl().textContent += "-";
                    break;
            }
        }
        Element.volEl().textContent += "]";
        Element.sound().volume = (get.vol / 100);
        localStorage.setItem('playerVolume', get.vol);
        hideVol();
        return;
    },

    volumeDown() {
        clearTimeout(Input.volTimeOut);
        Element.volEl().style.display = 'block';
        (get.vol <= 0) ? get.vol = 0 : get.vol -= 5;
        Element.volEl().textContent = "Volume [";
        for (let i = 0; i < (get.vol); i += 5) {
            switch (i) {
                case 45: Element.volEl().textContent += "|";
                    break;
                default: Element.volEl().textContent += "-";
                    break;
            }
        }
        Element.volEl().textContent += "]";

        Element.sound().volume = (get.vol / 100);


        localStorage.setItem('playerVolume', get.vol);

        hideVol();
        return;
    },

    //----------------------------Volume Functions END-----------------------------//
   
};


//set timeout as global variabe. Find a better way!!
let volTimeOut = setTimeout(function () {
    Element.volEl().style.display = 'none';
    clearTimeout(volTimeOut);
    return;
}, 1);

//resets volume display timout
function hideVol() {
    clearTimeout(volTimeOut);
    Element.volEl().style.display = 'block';
    volTimeOut = setTimeout(function () {
        Element.volEl().style.display = 'none';
        clearTimeout(volTimeOut);
        return;
    }, 1500);
}

