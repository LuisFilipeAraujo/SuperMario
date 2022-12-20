const mario = document.querySelector('.mario');//para pegar a classe .mario 

const jump = ()=>{
mario.classList.add('jump');
}

document.addEventListener('keydown', jump); //tecla faz pular