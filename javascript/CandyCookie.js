class CandyCookie {
  constructor(positionX) {
    this.w = 50;
    this.h = 50;
    if(positionX>=canvas.width)
    {
      this.x=positionX-this.w
    }
    else{
      this.x=positionX
    }
   
    this.y = 0-this.h;
    this.img = new Image();
    this.img.src = "images/sugar/cookie.png";
    this.speedFall = 4;
    this.score=30
    this.hungryBar=6
    
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  move = () => {
    this.y += this.speedFall;
  };
}
