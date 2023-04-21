class CandyYellow {
  constructor(positionX) {
    this.w = 50;
    this.h = 50;
    this.x = positionX; // hacer aleatorio
    //this.y=0-this.h
    this.y = 0-this.h;
    this.img = new Image();
    this.img.src = "images/sugar/yellowcandy.png";
    this.speedFall = 2;
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
