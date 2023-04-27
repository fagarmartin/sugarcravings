//* VARIABLES GLOBALES

const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
const gameDOM = document.querySelector("#game");
const splashScreenDOM = document.querySelector("#splash-screen");
const gameOverScreenDOM = document.querySelector("#game-over-screen");
const btnStartGame = document.querySelector("#start-btn");
const btnRestartGame = document.querySelector("#restart-btn");
const btnPauseGame = document.querySelector("#btn-pause");
const btnSoundGame = document.querySelector(".btn-sound");

const msgPause = document.querySelector("#pause-msg");

const audioIntro = new Audio();
audioIntro.src = "sounds/intro.mp3";

/*para actualizar score*/

const yourScoreDOM = document.querySelector("#your-score");
const highScoreDOM = document.querySelector("#high-score");
const msgImproved = document.querySelector("#improved");

let gameObj;
let moveLeftKey = "KeyA";
let moveRightKey = "KeyD";

const restartGame = () => {
  gameOverScreenDOM.style.display = "none";
  startGame();
};

const startAudio = () => {
  if (!btnSoundGame.classList.contains("off")) {
    audioIntro.volume = 0.05;
    audioIntro.play();
  }
};
const startGame = () => {
  startAudio();
  splashScreenDOM.style.display = "none";
  gameDOM.style.display = "block";
  gameObj = new Game();
  gameObj.chooseRandomCrave();

  //1. Cambiar las pantallas del juego
  // todo

  //2. Crear los elementos del juego

  //3. Iniciar el bucle del juego (recursion)
 
    gameObj.gameLoop();
 
  
};

//comprueba hacia donde esta moviendose segun tecla presionada y pone la variable a true
const checkKeyDown = (event, isMoving) => {
  if (event.code === moveLeftKey && gameObj !== undefined) {
    gameObj.character.isMovingLeft = isMoving;
  } else if (event.code === moveRightKey && gameObj !== undefined) {
    gameObj.character.isMovingRight = isMoving;
  }
};
const pause = () => {
  if (gameObj.isGameOn) {
    msgPause.style.display = "block";
    gameObj.isGameOn = false;
    audioIntro.pause();
  } else {
    // solo si la musica no esta pausada
    gameObj.isGameOn = true;
    if (!btnSoundGame.classList.contains("off")) {
      startAudio()
    }

    msgPause.style.display = "none";
    gameObj.gameLoop();
  }
};
window.addEventListener("keydown", (event) => {
  checkKeyDown(event, true);
});

window.addEventListener("keyup", (event) => {
  checkKeyDown(event, false);
});
btnStartGame.addEventListener("click", startGame);
btnRestartGame.addEventListener("click", restartGame);
btnPauseGame.addEventListener("click", pause);
btnSoundGame.addEventListener("click", () => {
  btnSoundGame.classList.toggle("off"); //comprueba si el juego esta pausado para darle a play al audio
  if (
    audioIntro.paused &&
    gameObj.isGameOn &&
    !btnSoundGame.classList.contains("off")
  ) {
    startAudio()
  } else {
    audioIntro.pause();
  }
});
//window.addEventListener("load", startAudio);
