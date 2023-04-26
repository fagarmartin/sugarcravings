// cambiar arrays de caramelos por separado
class Game {
  constructor() {
    this.hungerBarUI = new HungerBar();
    this.background = new Image();
    this.background.src = "images/background.png";
    this.score=new Score(); // depende del caramelo
    //this.hungryBar = 50; // al principio porcentaje (?)
    this.character = new Character();
    this.candyArr = [];
    this.respawnGapY = 200; // espacio que recorre el ultimo elemento creado para la creacion de uno nuevo
    this.candyCollisionGap = 30;
    this.candyCreationGap = 80;
    this.isGameOn = true;
    this.crave;
    this.randomCrave = 0; // se usara para ver si es de la clase de esta posicion en arrayCandyColors
    this.arrayLevels = [0, 125, 400, 700, 900];
    this.arrayIsLevel = [false, false, false, false, false];
    this.maxLevel = this.arrayLevels.length - 1;
    this.currentLevel = 0;
    this.maxHungryBar = 100; // porcentaje maximo
    this.randomLimit = canvas.width - this.candyCreationGap;
    this.isInmortal = false;
    this.maxRandomBlackBug=50000
    this.minRandomBlackBug=25000
    this.damage=45 // daño que hace el bicho al chocar con el personaje
    this.arrayCandyColors = [
      "CandyRed",
      "CandyYellow",
      "CandyCookie",
      "CandyCake",
    ];
    this.arrayCandyImages = [
      "images/sugar/redcandy.png",
      "images/sugar/yellowcandy.png",
      "images/sugar/cookie.png",
      "images/sugar/cake.png",
    ];
    this.blackBugs = [];
    
  }
  clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  drawBackground = () => {
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
  };

  gameOver = () => {
    if (!this.isInmortal) {
      // para testear
      if (this.hungerBarUI.value <= 0) {
        let maxScore = localStorage.getItem("score");

        if (this.score.value > maxScore) {
          // si supera la puntuacion maxima guardada
          msgImproved.style.display = "block";
          yourScoreDOM.innerText = this.score.value; // muestra la puntuacion en el game over
          highScoreDOM.innerText = this.score.value;
          localStorage.setItem("score", this.score.value); // guarda la puntuacion de manera local
        } else {
          msgImproved.style.display = "none";
          yourScoreDOM.innerText = this.score.value;
          highScoreDOM.innerText = maxScore;
        }
        this.pausarAudio();
        this.isGameOn = false;
        gameOverScreenDOM.style.display = "block";
        gameDOM.style.display = "none";
      }
    }
  };

  pausarAudio = () => {
    audioIntro.pause(); // para audio de intro
    audioIntro.currentTime = 0;
  };

  createCandy = (tipoCandy) => {
    if (
      this.candyArr.length === 0 ||
      this.candyArr[this.candyArr.length - 1].y > this.respawnGapY
    ) {
      let randomPosX = Math.random() *  this.randomLimit ;
      //console.log(randomPosX)
      //  console.log(0>=randomPosX)
      let newCandy = this.chooseRandomCandy(randomPosX); // hace un random para el color de los caramelos y devuelve el objeto
      this.candyArr.push(newCandy);
    }
  };
  chooseRandomCandy = (posX) => {
    let randomCandy = Math.floor(Math.random() * (this.arrayCandyColors.length-0));
     
    let newCandy;
    if (this.arrayCandyColors[randomCandy] === "CandyRed") {
      newCandy = new CandyRed(posX, this.currentLevel * 0.1);
      return newCandy;
    } else if (this.arrayCandyColors[randomCandy] === "CandyYellow") {
      newCandy = new CandyYellow(posX, this.currentLevel * 0.1);
      return newCandy;
    } else if (this.arrayCandyColors[randomCandy] === "CandyCookie") {
      newCandy = new CandyCookie(posX, this.currentLevel * 0.1);
      return newCandy;
    } else if (this.arrayCandyColors[randomCandy] === "CandyCake") {
      newCandy = new CandyCake(posX, this.currentLevel * 0.1);
      return newCandy;
    }
  };
  chooseRandomCrave = () => {
    this.randomCrave = Math.floor(Math.random() * this.arrayCandyColors.length);
    this.crave = new Crave(this.arrayCandyImages[this.randomCrave]);
    this.candyCreationGap -= 50; // cree los elementos más rápido
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
    this.candyArr.forEach((eachCandy, count) => {
      if (
        //colisiona con personaje
        eachCandy.x < this.character.x + this.character.w &&
        eachCandy.x + eachCandy.w > this.character.x &&
        eachCandy.y < this.character.y + this.character.h &&
        eachCandy.h + eachCandy.y > this.character.y + this.candyCollisionGap //para que no se elimine justo cuando toca al personaje
      ) {
        let isCrave = this.checkCrave(eachCandy, count); // checkea si es el caramelo correcto y actualiza score
        let candyHungryBar = this.candyArr[count].restHungryBar;
        let candyScore = this.candyArr[count].score;

        this.candyArr.splice(count, 1);

        if (isCrave) {
          this.character.startEatCrave(); // empieza a comer

          this.score.value += candyScore; // suma la puntuacion de cada caramelo
          if (this.hungerBarUI.value < this.maxHungryBar - candyHungryBar) {
            this.hungerBarUI.value += candyHungryBar; // solo descuenta barra hambre si deja caer el carameo del antojo
          } else {
            this.hungerBarUI.value = this.maxHungryBar;
          }
        } else {
          this.character.startDisgusted();

          this.hungerBarUI.value -= candyHungryBar;
        }
      } else if (
        eachCandy.y >
        canvas.height - (this.character.groundPosition - this.candyCollisionGap)
      ) {
        let candyHungryBar = this.candyArr[count].hungryBar;
       
        
        if (this.checkCrave(eachCandy, count)) {
          // si se ha caido un caramelo bueno vuelve a hacer random
          this.hungerBarUI.value -= candyHungryBar;
          console.log("CHOCA CARAMELO BUENO",eachCandy.constructor.name,eachCandy.x,eachCandy.y)
          this.chooseRandomCrave();
        }
        this.candyArr.splice(count, 1);
      }
    });

    this.gameOver();
  };
  checkCollisionBug = () => {
   
    if (this.blackBugs .length>0) {
      
        //colisiona con personaje
        
        this.blackBugs.forEach((eachBug,index)=>{
          if (
            eachBug.x < this.character.x + this.character.w &&
            eachBug.x + eachBug.w > this.character.x &&
            eachBug.y < this.character.y + this.character.h &&
            eachBug.h + eachBug.y >
              this.character.y + this.candyCollisionGap //para que no se elimine justo cuando toca al personaje
          ) {
           if(eachBug.canDamage)
           {
            this.score.value -= eachBug.damage;
            this.score.value=this.checkScoreZero(this.score.value)
            eachBug.doDamage()
           }
            
          }
          if (eachBug.canGo) { // cuando ha dado X vueltas desaparece
            this.blackBugs.splice(index,1) ;
          }
        })
        
      
    }
    this.gameOver();
  };

  checkScoreZero=(score)=>{ 
    if(score<0)
    {
      return 0
    }
    else{
      return score
    }

  }

  createBlackBug=()=>{
    let movingDir=Math.floor(Math.random()*2)
    //console.log("MOVINGDIR",movingDir)    
    this.blackBugs.push(new BlackBug(movingDir))
  }

  changeDifficulty = () => {
    if (
      !this.arrayIsLevel[this.currentLevel] &&
      this.score.value >= this.arrayLevels[this.currentLevel] &&
      this.currentLevel < this.arrayLevels.length - 1
    ) {
      // para que solo entre una vez
    
      //setTimeout(this.createBlackBug,Math.random() * (this.maxRandomBlackBug - this.minRandomBlackBug) + this.minRandomBlackBug);
      setTimeout(this.createBlackBug,10000);
      // console.log("SUBE DE NIVEL", this.currentLevel);
      this.arrayIsLevel[this.currentLevel] = true;
      this.currentLevel++;
      this.respawnGapY -= 35;
    }
  };
  gameLoop = () => {
    //1. Limpieza del canvas
    this.clearCanvas();
    //2. Acciones y movimiento de los elementos

    this.character.move();
    this.checkCollisionCandy();

    this.checkCollisionBug();

    this.createCandy();
    this.candyArr.forEach((eachCandy) => {
      eachCandy.move();
    });
    this.blackBugs.forEach((eachBug)=>{
      eachBug.move();
    })
    //3. Dibujado de los elementos
    this.drawBackground();
    this.character.draw();
    this.candyArr.forEach((eachCandy) => {
      eachCandy.draw();
    });

    this.crave.draw();
    this.blackBugs.forEach((eachBug)=>{
      eachBug.draw();
    })     
    

    this.score.draw();
    this.hungerBarUI.draw();
    this.changeDifficulty();

    //4. Recursion (requestAnimationFrame)
    if (this.isGameOn) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
