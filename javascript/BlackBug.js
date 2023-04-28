class BlackBug {
  constructor(isMovingRight, speedSum) {
    this.isMovingRight = isMovingRight;
    this.w = 40;
    this.h = 40;
    this.groundPosition = 150;

    if (this.isMovingRight) {
      this.x = 0 - this.w;
    } else {
      this.x = canvas.width + this.w;
    }

    this.y = canvas.height - this.groundPosition;
    this.img = new Image();
    this.img.src = "images/character/blackbug.png";
    this.speedJump = 4;
    this.speedFall = 2;
    this.isJumping = true;
    this.isFalling = false;
    this.speedHorizontal = 3 + speedSum;
    this.canGo = false;
    this.countMove = 0;
    this.maxCountMove = 1;
    this.canDamage = true;
    this.damage = 100; // resta al score si choca con el personaje
    this.hasDamaged = false;
    this.canPlayJumpSound = true;
    this.timeOutDamage;
    /* sounds */

    this.jumpSound = new Audio();
    this.jumpSound.src = "sounds/jumpingbug.mp3";
    this.jumpSound.volume = 0.03;
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  move = () => {
    if (this.countMove > this.maxCountMove) {
      this.canGo = true; // puede desaparecer
    }
    if (this.y > canvas.height / 2 && !this.isFalling) {
      this.isJumping = true;
      this.isFalling = false;
    } else if (this.y <= canvas.height / 2) {
      this.isJumping = false;
      this.isFalling = true;
    } else if (this.y >= canvas.height - this.groundPosition + this.h / 2) {
      this.playAudio(this.jumpSound);
      this.isJumping = true;
      this.isFalling = false;
    }

    if (this.isMovingRight) {
      if (this.isJumping) {
        this.y -= this.speedJump;
        this.x += this.speedHorizontal;
      } else {
        this.y += this.speedFall;
        this.x += this.speedHorizontal;
      }
      if (this.x >= canvas.width - this.w && this.isMovingRight) {
        this.isMovingRight = false;
        this.countMove++;
      }
    } else {
      if (this.isJumping) {
        this.y -= this.speedJump;
        this.x -= this.speedHorizontal;
      } else {
        this.y += this.speedFall;
        this.x -= this.speedHorizontal;
      }
      if (this.x <= 0 && !this.isMovingRight) {
        this.isMovingRight = true;
        this.countMove++;
      }
    }
  };
  playAudio = (audio) => {
    if (!btnSoundGame.classList.contains("off")) {
      audio.volume = 0.02;
      audio.play(); // solo llama a la funcion si true
    }
  };
  doDamage = () => {
    this.canDamage = false;
    this.timeOutDamage = new Timeout(() => {
      this.canDamage = true;
      this.hasDamaged = false;
    }, 4000);
  };
}
