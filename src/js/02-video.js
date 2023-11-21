import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player(document.getElementById('vimeo-player'));


function initPlayer() {

  const currentTime = localStorage.getItem('videoplayer-current-time');

 
  if (currentTime) {
    player.setCurrentTime(parseFloat(currentTime));
  }

  
  player.on('timeupdate', throttle(() => {
    player.getCurrentTime().then(current => {
      localStorage.setItem('videoplayer-current-time', current.toString());
    });
  }, 1000));
}

document.addEventListener('DOMContentLoaded', initPlayer);
