class CandyYellow {
  constructor(positionX) {
    this.w = 45;
    this.h = 45;
    if(positionX>=canvas.width)
    {
      this.x=positionX-this.w
    }
    else{
      this.x=positionX
    }
   
    this.x = positionX-this.w; // hacer aleatorio
    //this.y=0-this.h
    this.y = 0-this.h;
    this.img = new Image();
    this.img.src = "images/sugar/yellowcandy.png";
    this.speedFall = 3;
    this.score=15
    this.hungryBar=3
    
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  move = () => {
    this.y += this.speedFall;
  };
}
