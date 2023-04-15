const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreSpan = document.querySelector('.score');

let score = 0; // inicializa a pontuação como zero
let gameOver = false;

const jump = () => {
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
}

const checkGameOver = () => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  console.log(marioPosition);

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

  } else if (pipePosition <= -75) { // o obstáculo foi ultrapassado com sucesso
    score++; // incrementa a pontuação
    scoreSpan.textContent = score; // exibe a pontuação atual na tela
  
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
  location.reload(); // recarrega a página, reiniciando o jogo
}

