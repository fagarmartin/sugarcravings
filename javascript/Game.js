// cambiar arrays de caramelos por separado
class Game {
  constructor() {
    this.hungerBarUI = new HungerBar();
    this.background = new Image();
    this.background.src = "images/background.png";
    this.score = new Score(); // depende del caramelo
    //this.hungryBar = 50; // al principio porcentaje (?)
    this.character = new Character();
    this.candyArr = [];
    this.respawnGapY = 200; // espacio que recorre el ultimo elemento creado para la creacion de uno nuevo
    this.candyCollisionGap = 30;
    this.candyCreationGap = 80;
    this.isGameOn = true;
    this.crave; // marcador de caramelo bueno
    this.randomCrave = 0; // se usara para ver si es de la clase de esta posicion en arrayCandyColors
    this.arrayLevels = [0, 250, 600, 900, 1200,1600,1950,2500,3000];
    this.arrayIsLevel = [false, false, false, false, false, false, false, false, false];
    this.sumaVelocidadLevel=[0,0,0.25,0.5,1,1.5,1.6,1.75,2]
    this.restBarLevel=[0,5,10,20,50,60,70,75]
    this.maxLevel = this.arrayLevels.length - 1;
    this.currentLevel = 0; // servira para saber en que nivel esta y de multiplicador para subir velocidad por nivel
    this.maxHungryBar = 100; // porcentaje maximo
    this.randomLimit = canvas.width - this.candyCreationGap;
    this.isInmortal = false;
    this.maxRandomBlackBug = 10000;
    this.minRandomBlackBug = 5000;
    this.firstTime = true;
    //this.oldCrave=-1; // para compararlo con el nuevo valor

    // time outs necesarios

    //this.damage=45 // daño que hace el bicho al chocar con el personaje
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
  // para que al pausar no se sigan ejecutando los time outs
  pausarTimeOuts = () => {
    this.checkUndefinedAndPause(this.character.timeOutDamaged);//
    this.checkUndefinedAndPause(this.character.timeOutEat);//
    this.checkUndefinedAndPause(this.character.timeOutLoseCrave);//
    this.checkUndefinedAndPause(this.character.timeOutDisgusted);//
    this.checkUndefinedAndPause(this.crave.timeOutColorChange);    //
    this.checkUndefinedAndPause(this.timeOutBlackBug)//
    this.checkUndefinedAndPause(this.timeOutMsg)//
    this.blackBugs.forEach((eachBug)=>{
      this.checkUndefinedAndPause(eachBug.timeOutDamaged);//
    })
  };
  reanudarTimeOuts = () => {
    this.checkUndefinedAndRun(this.character.timeOutDamaged);
    this.checkUndefinedAndRun(this.character.timeOutEat);
    this.checkUndefinedAndRun(this.character.timeOutLoseCrave);
    this.checkUndefinedAndRun(this.character.timeOutDisgusted);  
    this.checkUndefinedAndRun(this.crave.timeOutColorChange);
    this.checkUndefinedAndRun(this.timeOutMsg)
    this.checkUndefinedAndRun(this.timeOutBlackBug)
    this.blackBugs.forEach((eachBug)=>{
      this.checkUndefinedAndRun(eachBug.timeOutDamaged);
    })
  };

  checkUndefinedAndRun = (timeOutObject) => {
    if (timeOutObject !== undefined) {
      timeOutObject.run();
    }
  };
  checkUndefinedAndPause = (timeOutObject) => {
    if (timeOutObject !== undefined) {
      timeOutObject.pause();
    }
  };
  pausarAudio = () => {
    audioIntro.pause(); // para audio de intro
    audioIntro.currentTime = 0;
    audioIntro.isLoop=true
  };

  createCandy = (tipoCandy) => {
    if (
      this.candyArr.length === 0 ||
      this.candyArr[this.candyArr.length - 1].y > this.respawnGapY
    ) {
      let randomPosX = Math.random() * this.randomLimit;
      //console.log(randomPosX)
      //  console.log(0>=randomPosX)
      let newCandy = this.chooseRandomCandy(randomPosX); // hace un random para el color de los caramelos y devuelve el objeto
      this.candyArr.push(newCandy);
    }
  };
  chooseRandomCandy = (posX) => {
    let randomCandy = Math.floor(
      Math.random() * (this.arrayCandyColors.length - 0)
    );

    let newCandy;
    if (this.arrayCandyColors[randomCandy] === "CandyRed") {
      newCandy = new CandyRed(posX, this.sumaVelocidadLevel[this.currentLevel]);
      return newCandy;
    } else if (this.arrayCandyColors[randomCandy] === "CandyYellow") {
      newCandy = new CandyYellow(posX, this.sumaVelocidadLevel[this.currentLevel]); //aumenta la velocidad con current level
      return newCandy;
    } else if (this.arrayCandyColors[randomCandy] === "CandyCookie") {
      newCandy = new CandyCookie(posX, this.sumaVelocidadLevel[this.currentLevel]);
      return newCandy;
    } else if (this.arrayCandyColors[randomCandy] === "CandyCake") {
      newCandy = new CandyCake(posX, this.sumaVelocidadLevel[this.currentLevel]);
      return newCandy;
    }
  };
  chooseRandomCrave = () => {
    if (this.hungerBarUI.canLoseValue) {
      // solo se ejecuta si no esta en el tiempo de reaccion para el usuario
      let oldCrave = this.randomCrave;
      this.randomCrave = Math.floor(
        Math.random() * this.arrayCandyColors.length
      );

      this.crave = new Crave(this.arrayCandyImages[this.randomCrave]);
      if (this.randomCrave !== oldCrave && !this.firstTime) {
        this.hungerBarUI.valueFreeze();

        this.crave.changeColorFrame();
      }
      //this.candyCreationGap -= 50; // cree los elementos más rápido
    }
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
        let candyRestHungryBar = eachCandy.restHungryBar;
        let candyScore = eachCandy.score;
        let candyHungryBar=eachCandy.hungryBar;
        let restLevel=this.restBarLevel[this.currentLevel]
        this.candyArr.splice(count, 1);

        if (isCrave) {
          // si es igual al marcado
          this.character.startEatCrave(); // empieza a comer
          this.score.sumScore(candyScore);
          // this.score.value += candyScore; // suma la puntuacion de cada caramelo
          if (this.hungerBarUI.value < this.maxHungryBar - candyHungryBar) {
            
            this.hungerBarUI.value += candyHungryBar; // solo descuenta barra hambre si deja caer el caramelo del antojo
            console.log(this.hungerBarUI.value,candyHungryBar)
          } else {
            this.hungerBarUI.value = this.maxHungryBar;
          }
        } else {
          this.character.startDisgusted();
          if (this.hungerBarUI.canLoseValue) {
            
            this.hungerBarUI.value = this.hungerBarUI.value -(candyRestHungryBar+restLevel);
          }

         
        }
      } else if (
        //si choca contra el suelo
        eachCandy.y >
        canvas.height - (this.character.groundPosition - this.candyCollisionGap)
      ) {
        let restLevel=this.restBarLevel[this.currentLevel]

        if (this.checkCrave(eachCandy, count)) {
          // si se ha caido un caramelo bueno vuelve a hacer random
          this.hungerBarUI.restValue(eachCandy.restHungryBar+restLevel); // checkea si le puede restar valor
          //this.hungerBarUI.value -= candyHungryBar;
          if (this.hungerBarUI.canLoseValue) {
            this.character.loseCrave();
            this.chooseRandomCrave();
          }
        }
        this.candyArr.splice(count, 1);
      }
    });

    this.gameOver();
  };
  checkCollisionBug = () => {
    if (this.blackBugs.length > 0) {
      //colisiona con personaje

      this.blackBugs.forEach((eachBug, index) => {
        if (
          eachBug.x < this.character.x + this.character.w &&
          eachBug.x + eachBug.w > this.character.x &&
          eachBug.y < this.character.y + this.character.h &&
          eachBug.h + eachBug.y > this.character.y + this.candyCollisionGap
        ) {
          if (!eachBug.hasDamaged && !this.character.isDamaged) {
            // para que solo reste una vez cuando colisiona
            this.score.restScore(eachBug.damage);
            // this.score.value -= eachBug.damage;
            this.score.value = this.checkScoreZero(this.score.value);
            eachBug.doDamage();
            this.character.damageScore();
          }
        }
        if (eachBug.canGo) {
          // cuando ha dado X vueltas desaparece
          this.blackBugs.splice(index, 1);
        }
      });
    }
    this.gameOver();
  };

  checkScoreZero = (score) => {
    if (score < 0) {
      return 0;
    } else {
      return score;
    }
  };

  createBlackBug = () => {
    let movingDir = Math.floor(Math.random() * 2);
    //console.log("MOVINGDIR",movingDir)
   
    this.blackBugs.push(new BlackBug(movingDir,this.sumaVelocidadLevel[this.currentLevel]));
    this.crave.timedMessage(
      msgInGame,
      "Avoid the bug or it will take your points!",
      5000
    );
  };

  changeDifficulty = () => {
    if (
      !this.arrayIsLevel[this.currentLevel] &&
      this.score.value >= this.arrayLevels[this.currentLevel] &&
      this.currentLevel < this.arrayLevels.length - 1
    ) {
      // para que solo entre una vez
      //this.timeOutBlackBug = new Timeout(this.createBlackBug, 100);
      let randomTime=Math.random() * (this.maxRandomBlackBug - this.minRandomBlackBug) +  this.minRandomBlackBug
      //console.log(randomTime,"RANDOMTIME")
      this.timeOutBlackBug = new Timeout(this.createBlackBug,randomTime);
      //setTimeout(this.createBlackBug,Math.random() * (this.maxRandomBlackBug - this.minRandomBlackBug) + this.minRandomBlackBug);
      //setTimeout(this.createBlackBug,1000);
      // console.log("SUBE DE NIVEL", this.currentLevel);
      this.arrayIsLevel[this.currentLevel] = true;
      this.currentLevel++;
      if(this.respawnGapY<=0)
      {
        this.respawnGapY=5
      }
      else{
        this.respawnGapY -= 10;
      }
      
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
    this.blackBugs.forEach((eachBug) => {
      eachBug.move();
    });
    //3. Dibujado de los elementos
    this.drawBackground();
    this.character.draw();
    this.candyArr.forEach((eachCandy) => {
      eachCandy.draw();
    });

    this.crave.draw();
    this.blackBugs.forEach((eachBug) => {
      eachBug.draw();
    });

    this.score.draw();
    this.hungerBarUI.draw();
    this.changeDifficulty();
    if (this.firstTime) {
      //ejecutar ciertas funciones despues de la primera ejecucion
      this.firstTime = false;
    }
    //4. Recursion (requestAnimationFrame)
    if (this.isGameOn) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
