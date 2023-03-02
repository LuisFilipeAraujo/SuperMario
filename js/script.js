const mario = document.querySelector('.mario');//para pegar a classe .mario 
const pipe = document.querySelector('.pipe');

const jump = ()=>{
mario.classList.add('jump');

setTimeout(()=>{

    mario.classList.remove('jump');
     }, 500);
}

const loop = setInterval(()=>{

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    console.log(marioPosition);

    if (pipePosition <= 80 && pipePosition > 0 && marioPosition < 100) { //condições para parada
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'images/game-over.png'; //muda o mario para a imagem de derrota
        mario.style.width = '80px';
        mario.style.marginLeft = '50px;'
    }
  
},10);
document.addEventListener('keydown', jump); //tecla faz pular