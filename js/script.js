const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreSpan = document.querySelector('.score');
const clouds = document.querySelector('.clouds');

let score = 0;
let gameOver = false;
let passedPipe = false;

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

const loop = setInterval(() => {
  checkGameOver();
}, 10);

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyW' || event.code === 'Space' || event.code === 'ArrowUp') {
    jump();
  }
  if (gameOver && event.keyCode) {
    restartGame();
  }
});

const restartGame = () => {
  location.reload();
}