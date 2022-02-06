# CRT Flash Back Machine
## Description:  
## NOTE: 
### There may be issues with your localStorage due to a required fix. See bottom of READEME for fix

Ever wish you could go back in time to the "good-old-days" of tube TV's, predetermined television programming and unskippable commercials? CRT Flash Back Machine is designed to fill this empty void, and hit you with a healthy dose of nostalgia! View hundreds of vintage programming from the past century on your favorite old CRT television! Sit back and let the good times roll!

## Instructions

This program is specifically designed for the use of a standard definition tube TV set.  It is recommened to run this program on a device such as the Raspberry Pi, but the minimum requirements are:

- Device capable of playing videos in a web browser.
- ~~device capable of 480i/p video-out and a compatible screen~~
- New vertical, horizontal shift and overscan allow for adjustments for larger resolutions

Furthermore, and most importantly, you MUST configure your browser to allow autoPlay. Due to the nature of this program, there is no user input to initiate the video player. The ultimate expiriance is had with a dedicated device that automattically boots into a web borwser with this program as its home page,which is why a linux based hobby computer is the best choice.

## features

- Generates random video from slected playlist (channel)
- Saves epsiodes that the user has watched for at least 10min so they dont repeat
- Can be controlled entirely by number keypad, allowing for use of wireless keypad as a simple remote
- Refreshing the page generates a new episode
- -NEW- Added new buttons [see README]
- -NEW- Can now skip episode and remove it from random selection
- -NEW- Added controls overscan and horizintal/vertical shift

## Controls
| Key  |Action   |
| ------------ | ------------ |
|  + PgUp |   Channel Up |
|  - PgDwn|  Channel Down  |
| Number 0-9  |  Enter a channel  |
|  *  |Vol+|
|  / |Vol-|
|  . , | Display/Hide list of channels  |
|  F5/Insert | Reload Page for new random show  |
|Home| Pseudo power down|
|End| Skip episode forever|



## System Controls
|While channel list is open| |
|---------------|---------------|
|Input 99| Clears the Memory of the Current Channel|
|Input 98| Clears all Channel Memory|  
|CH+/Ch-| Increase/Decrease Overscan|
|Direction Keys| Horizontal/Vertical Shift|

Note: Memory contains all previously watched episodes which are excluded when genrating random episodes.  
### ***Due to recent bug fixes and added features you may need to clear your memory (see System Control above)
### *** To keep your memory intact you will need to edit localStorage through Inspector and change the first value of every numbered key to a zero. 

## [link](https://chriskurz098.github.io/80sGameshowPlayer/)
