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
    volumeSlider.addEventListener('input', setVolume, false);
    fullScreenButton.addEventListener('click', toggleFullScreen, false);

    //update the progress bar and current time as video plays
    video.addEventListener('timeupdate', updateProgress, false);

    //add "seek" capability
    progressBar.addEventListener('mouseup', function (e) {

        //if user clicks on progress bar before video begins playing, fade out the video cover image
        if (!video.currentTime){
            $videoCover.fadeOut(500);
        }

        //e.pageX and e.pageY are teh x,y coordinates where the mouse event occurred relative to the edges of the page
        //e.offsetX and e.offsetY are the x,y coordinates where the mouse event occurred relative to the target element
        var playPosition = e.offsetX.toFixed(2);

        video.currentTime = ((video.duration / progressBar.offsetWidth) * playPosition).toFixed(2);

    }, false);

    //Fade the video cover image when video ends
    video.addEventListener('ended', function () {

        if (playPauseButton.className == 'pauseBtn'){
            playPauseButton.className = 'playBtn';
        }

        $videoCover.fadeIn(3000);

    }, false)

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

function setVolume(){

    //is video muted?
    if (video.muted){ //video is muted
        toggleMute();
    }

    //set volume based on value of range slider right now
    video.volume = this.value;

}

function toggleFullScreen(){

    //Use feature detection to determine if user's browswer supports the requestFullScreen()
    if(video.requestFullScreen){
        video.requestFullScreen();
    } else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.msRequestFullScreen) {
        video.allowFullscreen = true;
        video.msRequestFullScreen();
    }

}

function updateProgress() {

    var value = 0;

    //not at the beginning of the video
    if(video.currentTime > 0){

        //get a percentage showing current progress of video playback
        value = (100 / video.duration) * video.currentTime;

    }

    //fill the progress bar to the point the video is currently at(current playback position) based on our percentage
    playProgress.style.width = value + '%';

    //determine and display current time
    currentMinutes = Math.floor(video.currentTime / 60);
    currentSeconds = Math.floor(video.currentTime % 60);

    if(currentSeconds < 10){
        seconds = "0" + currentSeconds;
    } else {
        seconds = currentSeconds;
    }

    currentTimeText.innerHTML = currentMinutes + ':' + seconds;

}









