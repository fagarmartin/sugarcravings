class Character {
  constructor() {
    this.groundPosition = 150; // posicion para que parezca que esta sobre el suelo
    this.w = 80;
    this.h = 65;
    this.x = canvas.width / 2;
    this.y = canvas.height - this.groundPosition; // se pondrá encima del terreno
    this.img = new Image();
    this.img.src = "images/character/char-idle.png";
    this.speed = 8.5;
    this.isMovingRight = false;
    this.isMovingLeft = false;
    //this.walkingRightSpriteFolder="images/character/walking-right/"
    this.maxSpritesNum = 15;
    this.countSprite = 1;
    this.animating;
    this.now;
    this.then;

    this.isEating = false;

    this.eatingImg = new Image();
    this.eatingImg.src = "images/character/char-eat-crave.png";

    this.walkingRightImg = new Image();
    this.walkingRightImg.src = "images/character/char-right.png";

    this.walkingLeftImg = new Image();
    this.walkingLeftImg.src = "images/character/char-left.png";

    this.idleImg = new Image();
    this.idleImg.src = "images/character/char-idle.png";

    this.disgustedImg = new Image();
    this.disgustedImg.src = "images/character/char-disgusted.png";

    /* audios*/
    this.audioEating = new Audio();
    this.audioEating.src = "sounds/eating.mp3";

    
    this.audioDisgust = new Audio();
    this.audioDisgust.src = "sounds/disgusted.mp3";
   
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  move = () => {
    //
    if (this.isMovingRight && this.x < canvas.width - this.w) {
      // es true cuando se pulsa la tecla,false cuando se deja de pulsar
      this.img = this.walkingRightImg;
      this.x += this.speed;
    }
    if (this.isMovingLeft && this.x > 0 && !this.isEating) {
      this.img = this.walkingLeftImg;
      this.x -= this.speed;
    }
  };

  stopEat = () => {
    this.isEating = false;
    this.img = this.idleImg;
  };

  startEatCrave = () => {
    this.playAudio(this.audioEating); 
    
    this.isEating = true;
    this.img = this.eatingImg;
    setTimeout(this.stopEat, 50);
  };

  startDisgusted = () => {
    this.playAudio(this.audioDisgust); 
    this.isEating = true;
    this.img = this.disgustedImg;
    setTimeout(this.stopEat, 65);
  };
  playAudio = (audio) => {
    
    if (!btnSoundGame.classList.contains("off")) {    
       
      audio.play(); // solo llama a la funcion si true
    }
  };
}
