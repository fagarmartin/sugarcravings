console.log("PROBANDO");

//* VARIABLES GLOBALES

const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");

const btnStartGame=document.querySelector("#start-btn")
let gameObj;
let moveLeftKey="KeyA"
let moveRightKey="KeyD"

const startGame = () => {
  
  gameObj = new Game();

 

  //1. Cambiar las pantallas del juego
  // todo

  //2. Crear los elementos del juego

  //3. Iniciar el bucle del juego (recursion)
  gameObj.gameLoop();
};



//comprueba hacia donde esta moviendose segun tecla presionada y pone la variable a true
const checkKeyDown=(event,isMoving)=>{
    
    if(event.code===moveLeftKey && gameObj !== undefined)
    {   
        
        gameObj.character.isMovingLeft=isMoving
       // console.log("MOVELEFT",gameObj.character.isMovingLeft)
    }
    else if (event.code===moveRightKey && gameObj !== undefined)
    {
        //console.log("MOVERIGHT")
        gameObj.character.isMovingRight=isMoving
    }
}
//window.addEventListener("load", startGame); // si no da error, cambiar luego a boton


window.addEventListener("keydown",(event)=>{
    checkKeyDown(event,true)
})

window.addEventListener("keyup",(event)=>{
    checkKeyDown(event,false)
})
btnStartGame.addEventListener("click",startGame)