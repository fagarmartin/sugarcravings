// cambiar arrays de caramelos por separado
class Game {
  constructor() {
    this.background = new Image();
    this.background.src = "images/background.png";
    this.score = 0; // depende del caramelo
    this.hungryBar = 50; // al principio porcentaje (?)
    this.character = new Character();
    this.candyArr = [];
    this.respawnGapY = 300; // espacio que recorre el ultimo elemento creado para la creacion de uno nuevo
    this.candyCollisionGap = 20;
    this.candyCreationGap = 50;
    this.isGameOn = true;
    this.crave;
    this.randomCrave = 0; // se usara para ver si es de la clase de esta posicion en arrayCandyColors
    this.arrayLevels = [0, 150, 250, 350, 450];
    this.arrayIsLevel = [false, false, false, false, false];
    this.maxLevel = this.arrayLevels.length - 1;
    this.currentLevel = 0;
    this.maxHungryBar = 100; // porcentaje maximo
    this.randomLimit=canvas.width - this.candyCreationGap

    this.arrayCandyColors = ["CandyRed", "CandyYellow", "CandyCookie"];
    this.arrayCandyImages = [
      "images/sugar/redcandy.png",
      "images/sugar/yellowcandy.png",
      "images/sugar/cookie.png",
    ];
    //this.character crear
    //this.caramelo crear mas adelante sera array
  }
  clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  drawBackground = () => {
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
  };

  gameOver = () => {
  
    if (this.hungryBar <= 0) {
    
      this.isGameOn = false;
      gameOverScreenDOM.style.display="block"
      canvas.style.display="none"
    }
  };

  createCandy = (tipoCandy) => {    

    if (
      this.candyArr.length === 0 ||
      this.candyArr[this.candyArr.length - 1].y > this.respawnGapY
    ) {
      //let randomPosX = Math.random() * (canvas.width - this.candyCreationGap);
      
      let randomPosX = Math.random() * this.randomLimit;
      
      let newCandy = this.chooseRandomCandy(randomPosX); // hace un random para el color de los caramelos y devuelve el objeto
      this.candyArr.push(newCandy);
    }
  };
  chooseRandomCandy = (posX) => {
    let randomCandy = Math.floor(Math.random() * this.arrayCandyColors.length);
    //  console.log("randomCandy", randomCandy);
    let newCandy;
    if (this.arrayCandyColors[randomCandy] === "CandyRed") {
      newCandy = new CandyRed(posX);
      return newCandy;
    } else if (this.arrayCandyColors[randomCandy] === "CandyYellow") {
      newCandy = new CandyYellow(posX);
      return newCandy;
    } else if (this.arrayCandyColors[randomCandy] === "CandyCookie") {
      newCandy = new CandyCookie(posX);
      return newCandy;
    }
  };
  chooseRandomCrave = () => {
    this.randomCrave = Math.floor(Math.random() * this.arrayCandyColors.length);
    this.crave = new Crave(this.arrayCandyImages[this.randomCrave]);
    this.candyCreationGap -= 50; // cree los elementos más rápido
  };

  drawScore = () => {
    ctx.font = "48px serif";
    ctx.fillStyle = "white";
    ctx.fillText(this.score, canvas.width - 100, 50);

    ctx.font = "48px serif";
    ctx.fillStyle = "white";
    ctx.fillText(this.hungryBar, 50, 50);
  };
  checkCrave = (candy, count) => {
  
    if (this.arrayCandyColors[this.randomCrave] === candy.constructor.name) {
      //saber si es la clase ?
      return true;
    } else {
      return false;
    }
  };
  checkCollisionCandy = () => {
    let count = 0;
    this.candyArr.forEach((eachCandy) => {
      if (
        eachCandy.x < this.character.x + this.character.w &&
        eachCandy.x + eachCandy.w > this.character.x &&
        eachCandy.y < this.character.y + this.character.h &&
        eachCandy.h + eachCandy.y > this.character.y + this.candyCollisionGap //para que no se elimine justo cuando toca al personaje
      ) {
        let isCrave = this.checkCrave(eachCandy, count); // checkea si es el caramelo correcto y actualiza score
        if (isCrave) {
          this.score += this.candyArr[count].score; // suma la puntuacion de cada carameloç
          if (
            this.hungryBar <
            this.maxHungryBar - this.candyArr[count].hungryBar
          )
            this.hungryBar += this.candyArr[count].hungryBar; // solo descuenta barra hambre si deja caer el carameo del antojo
        } else {
          this.hungryBar -= this.candyArr[count].hungryBar;
        }

        this.candyArr.splice(count, count + 1);
      } else if (
        eachCandy.y >
        canvas.height - (this.character.groundPosition - this.candyCollisionGap)
      ) {
        //check game over
       
        if (this.checkCrave(eachCandy, count)) {
          // si se ha caido un caramelo bueno vuelve a hacer random
          this.hungryBar -= this.candyArr[count].hungryBar;

          
          this.chooseRandomCrave();
        }
       
        this.candyArr.splice(count, count + 1);
      }

    });
    count++;
    this.gameOver();
  };
  changeDifficulty = () => {
    
    if (
      !this.arrayIsLevel[this.currentLevel] &&
      this.score >= this.arrayLevels[this.currentLevel] &&
      this.currentLevel < this.arrayLevels.length - 1
    ) {
      // para que solo entre una vez

     // console.log("SUBE DE NIVEL", this.currentLevel);
      this.arrayIsLevel[this.currentLevel] = true;
      this.currentLevel++;     
      this.respawnGapY -= 50;
    }
  };
  gameLoop = () => {
    //1. Limpieza del canvas
    this.clearCanvas();
    //2. Acciones y movimiento de los elementos

    this.character.move();
    this.createCandy();
    this.candyArr.forEach((eachCandy) => {
      eachCandy.move();
    });
    this.checkCollisionCandy();
    //3. Dibujado de los elementos
    this.drawBackground();
    this.character.draw();
    this.candyArr.forEach((eachCandy) => {
      eachCandy.draw();
    });
    this.crave.draw();
    this.drawScore();
    this.changeDifficulty();
    //4. Recursion (requestAnimationFrame)
    if (this.isGameOn) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
