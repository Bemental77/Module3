function initializePlayer() {

    video = document.querySelector('video.shadowEffect');

    video.controls = false;

    //select the video cover image and store it in a jquery object
    $videoCover = $('#videoCover');

    var seconds;

    //Grab handles (nicknames or references) to our various control elements (tags)
    playPauseButton = document.querySelector('#playPause');
    stopButton = document.querySelector('#stopButton');
    progressBar = document.querySelector('#progressBar');
    playProgress = document.querySelector('#played');
    muteButton = document.querySelector('#mute');
    volumeSlider = document.querySelector('#volumeSlider');
    fullScreenButton = document.querySelector('#fullScreen');

    //time values
    currentTimeText = document.querySelector('#currentTime');
    durationTimeText = document.querySelector('#durationTime');

    //determine and display the videos duration time
    durationMinutes = Math.floor(video.duration / 60);
    durationSeconds = Math.floor(video.duration % 60);

    if (durationSeconds < 10) {
        seconds = "0" + durationSeconds;
    } else {
        seconds = durationSeconds;
    }

    durationTimeText.innerHTML = durationMinutes + ":" + seconds;

    //Set up event listeners to detect when a control has been activated by the user
    playPauseButton.addEventListener('click', togglePlay, false);
    stopButton.addEventListener('click', stopVideo, false);
    muteButton.addEventListener('click', toggleMute, false);

}

function togglePlay() {

    //if video is paused or ended
    if (video.paused || video.ended){

        //if cover image is showing, fade it out quickly
        if ($videoCover){
            $videoCover.stop(true).fadeOut(500);
        }

        //play the video and change to pause icon
        video.play();

        //toggle the button's state (icon)
        this.className = 'pauseBtn';


    }else{ //video is playing

        //pause the video and change to play icon
        video.pause();
        this.className = 'playBtn';
    }

}

function stopVideo() {

    //pause the video
    video.pause();

    //reset the playback time to 0
    video.currentTime = 0;

    //if the playpause button is showing the pause icon, reset it to show the play icon
    if (playPauseButton.className == 'pauseBtn'){
        playPauseButton.className = 'playBtn';
    }
}


function toggleMute() {

    if (video.muted){

        video.muted = false;
        muteButton.className = 'mute';

    }else{ //video is not muted k

        video.muted = true;
        muteButton.className = 'unmute';
    }

}











