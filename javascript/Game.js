class Game {
  constructor() {
    this.background = new Image();
    this.background.src = "images/background.png";
    this.score = 0; // depende del caramelo
    this.hungryBar = 50; // al principio porcentaje (?)
    this.character = new Character();
    this.candyArr = [];
    this.respawnGapY = 400;
    this.candyCollisionGap = 20;
    this.candyCreationGap = 50;
    this.isGameOn=true
    this.crave;
    let randomCrave=0 // se usara para ver si es de la clase de esta posicion en arrayCandyColors

    this.arrayCandyColors=["CandyRed","CandyYellow"]
    this.arrayCandyImages=["images/sugar/redcandy.png","images/sugar/yellowcandy.png"]
    //this.character crear
    //this.caramelo crear mas adelante sera array
  }
  clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  drawBackground = () => {
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
  };

  gameOver=()=>{

    if(this.hungryBar<=0)
    {
        this.isGameOn=false
    }
  }

  createCandy = () => {
    if (
      this.candyArr.length === 0 ||
      this.candyArr[this.candyArr.length - 1].y > this.respawnGapY
    ) {
      let randomPosX = Math.random() * (canvas.width - this.candyCreationGap);
      let newCandy=this.chooseRandomCandy(randomPosX) // hace un random para el color de los caramelos y devuelve el objeto
      this.candyArr.push(newCandy);
      
    }
  };
  chooseRandomCandy=(posX)=>{
    let randomCandy=Math.floor(Math.random()*(this.arrayCandyColors.length))
    console.log("randomCandy",randomCandy)
    let newCandy;
    if(this.arrayCandyColors[randomCandy]==="CandyRed")
    {
        newCandy = new CandyRed(posX);
        return newCandy;
    }
    else  if(this.arrayCandyColors[randomCandy]==="CandyYellow")
    {
        newCandy = new CandyYellow(posX);
        return newCandy;
    }
  }
chooseRandomCrave=()=>{
    this.randomCrave=Math.floor(Math.random()*(this.arrayCandyColors.length))   
    this.crave=new Crave(this.arrayCandyImages[this.randomCrave])
    
}
  

  drawScore = () => {
    ctx.font = "48px serif";
    ctx.fillStyle = "white";
    ctx.fillText(this.score, canvas.width - 100, 50);

    ctx.font = "48px serif";
    ctx.fillStyle = "white";
    ctx.fillText(this.hungryBar, 50, 50);
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
        this.score += this.candyArr[count].score; // suma la puntuacion de cada caramelo
        this.hungryBar += this.candyArr[count].hungryBar;
        this.candyArr.splice(count, count + 1);
      } else if (
        eachCandy.y >
        canvas.height - (this.character.groundPosition - this.candyCollisionGap)
      ) {
        this.hungryBar -= this.candyArr[count].hungryBar;
        this.candyArr.splice(count, count + 1);
        //check game over
        this.gameOver()
      }
    });
    count++;
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
    this.crave.draw()
    this.drawScore();
    //4. Recursion (requestAnimationFrame)
    if(this.isGameOn)
    {
        requestAnimationFrame(this.gameLoop);
    }
    
  };
}
