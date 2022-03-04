
let get = {
    channelBuffer: 0,
    n: 0,
    on: 1, //if the screen is "on" used for fake shutoff
    lastInPlaylist: 0, //flag for when last episode in playlist
    volTimeOut: 0,
    pageData: [],
    beginPlace: 0,
    overscanSize: parseFloat(localStorage.getItem('overscan')),
    horShift: parseFloat(localStorage.getItem('horizontalShift')),
    verShift: parseFloat(localStorage.getItem('verticalShift')),
    vol: parseInt(localStorage.getItem('playerVolume')),
    crt: parseInt(localStorage.getItem('crtFilter')),
     rndEpisodeNum: 0,
     //the saved channel number
     num: localStorage.getItem('lastChannel')
}

