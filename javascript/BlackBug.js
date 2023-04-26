class BlackBug {
  constructor(isMovingRight) {
    this.isMovingRight=isMovingRight;
    this.w = 40;
    this.h = 40;
    this.groundPosition = 150;
    if(this.isMovingRight)
    {
      this.x = 0-this.w;
    }
    else{
      this.x = canvas.width+this.w;
    }
    
    this.y = canvas.height - this.groundPosition;
    this.img = new Image();
    this.img.src = "images/character/blackbug.png";
    this.speedJump = 4;
    this.speedFall = 2;
    this.isJumping = true;
    this.isFalling = false;
    this.speedHorizontal=2
    this.canGo=false
    this.countMove=0
    this.maxCountMove=1
    
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  move = () => {
   
    if(this.countMove>this.maxCountMove)
    {
      this.canGo=true // puede desaparecer
    }
    if (this.y > canvas.height / 2 && !this.isFalling) {
      this.isJumping = true;
      this.isFalling = false;
    } else if (this.y <= canvas.height / 2) {
      this.isJumping = false;
      this.isFalling = true;
    } else if (this.y >= canvas.height - this.groundPosition + this.h / 2) {
      this.isJumping = true;
      this.isFalling = false;
    }

    if(this.isMovingRight)
    {
     // console.log("ISMOVINGRIGHT")
      if (this.isJumping) {
        this.y -= this.speedJump;
        this.x += this.speedHorizontal;
      } else {
        this.y += this.speedFall;
        this.x += this.speedHorizontal;
      }
      if(this.x>=canvas.width-this.w && this.isMovingRight)
      {
        this.isMovingRight=false
        this.countMove++
      }
    }
    else 
    { //console.log("ISMOVINGLEFT")
      if (this.isJumping) {
        this.y -= this.speedJump;
        this.x -= this.speedHorizontal;
      } else {
        this.y += this.speedFall;
        this.x -= this.speedHorizontal;
      }
      if(this.x<=0 && !this.isMovingRight)
      {
        this.isMovingRight=true
        this.countMove++
      }
    }
  
  };
}
