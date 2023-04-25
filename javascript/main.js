//* VARIABLES GLOBALES

const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
const gameDOM = document.querySelector("#game");
const splashScreenDOM = document.querySelector("#splash-screen");
const gameOverScreenDOM = document.querySelector("#game-over-screen");
const btnStartGame = document.querySelector("#start-btn");
const btnRestartGame = document.querySelector("#restart-btn");
const btnPauseGame = document.querySelector("#btn-pause");

const msgPause = document.querySelector("#pause-msg");

const audioIntro=document.querySelector("#audio-intro")
/* audios*/
const audioEating=new Audio()
audioEating.src="sounds/eating.mp3"

const audioDisgust=new Audio()
audioDisgust.src="sounds/disgusted.mp3"

/*para actualizar score*/ 

const yourScoreDOM=document.querySelector("#your-score")
const highScoreDOM=document.querySelector("#high-score")
const msgImproved=document.querySelector("#improved")

let gameObj;
let moveLeftKey = "KeyA";
let moveRightKey = "KeyD";

const restartGame = () => {
  gameOverScreenDOM.style.display = "none";
  startGame();
};

const startAudio=()=>{
  audioIntro.volume=0.3
  audioIntro.play()
}
const startGame = () => {
 
  startAudio()
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
    audioIntro.pause()
  } else {
    gameObj.isGameOn = true;
    audioIntro.play()

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
