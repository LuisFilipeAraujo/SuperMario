const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreSpan = document.querySelector('.score');
const clouds = document.querySelector('.clouds');
const gameBoard = document.querySelector('.game-board');
const playButton = document.querySelector('.play-button');
const audio = document.querySelector('#myAudio');
const trackSelect = document.querySelector('.track-select');
const musicToggle = document.querySelector('.music-toggle');
const savedTrack = localStorage.getItem('superMarioTrack');

if (savedTrack && [...trackSelect.options].some((option) => option.value === savedTrack)) {
  trackSelect.value = savedTrack;
  audio.src = savedTrack;
}

let score = 0;
let gameOver = false;
let passedPipe = false;
let loop;

const jump = () => {
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
}

const checkGameOver = () => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 80 && pipePosition > 0 && marioPosition < 100) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = 'images/game-over.png';
    mario.style.width = '80px';
    mario.style.marginLeft = '50px;'

    clearInterval(loop);
    gameOver = true;
    clouds.style.animation = 'none'; // Pare a animação das nuvens quando o jogo acabar

  } else if (pipePosition <= -60 && !passedPipe) {
    score++;
    scoreSpan.textContent = score;
    passedPipe = true;
  } else if (pipePosition > -60) {
    passedPipe = false;
  }
}

const startGame = () => {
  gameBoard.classList.remove('is-ready');
  gameBoard.classList.add('is-playing');
  loop = setInterval(checkGameOver, 10);
  audio.play().catch(() => {});
};

trackSelect.addEventListener('change', () => {
  const shouldResume = gameBoard.classList.contains('is-playing') && !audio.paused;

  localStorage.setItem('superMarioTrack', trackSelect.value);
  audio.src = trackSelect.value;
  audio.load();

  if (shouldResume) {
    audio.play().catch(() => {});
  }
});

musicToggle.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => {
  musicToggle.textContent = 'Ⅱ';
  musicToggle.setAttribute('aria-label', 'Pausar música');
});

audio.addEventListener('pause', () => {
  musicToggle.textContent = '▶';
  musicToggle.setAttribute('aria-label', 'Tocar música');
});

gameBoard.classList.add('is-ready');
playButton.addEventListener('click', startGame);

document.addEventListener('keydown', (event) => {
  if (!gameBoard.classList.contains('is-playing')) {
    if (event.code === 'Enter' || event.code === 'Space') {
      startGame();
    }
    return;
  }

  if (event.code === 'KeyW' || event.code === 'Space' || event.code === 'ArrowUp') {
    jump();
  }
  if (gameOver && event.keyCode) {
    restartGame();
  }
});

const restartGame = () => {
  clearInterval(loop);
  score = 0;
  scoreSpan.textContent = score;
  gameOver = false;
  passedPipe = false;

  pipe.style.animation = '';
  pipe.style.left = '';
  clouds.style.animation = '';

  mario.src = './images/mario.gif';
  mario.style.animation = '';
  mario.style.bottom = '';
  mario.style.width = '';
  mario.style.marginLeft = '';

  audio.currentTime = 0;
  loop = setInterval(checkGameOver, 10);
  audio.play().catch(() => {});
}