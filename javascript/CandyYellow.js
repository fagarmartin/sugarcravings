class CandyYellow {
  constructor(positionX,speedLevel) {
    this.w = 45;
    this.h = 45;
    if(positionX>=canvas.width)
    {
      this.x=positionX-this.w
    }
    else if(positionX<=this.w)
    {
      
      this.x=this.w
     // console.log("ENTRA X",this.x)
    }else{
      this.x=positionX
    }
   
       //this.y=0-this.h
    this.y = 0-this.h;
    this.img = new Image();
    this.img.src = "images/sugar/yellowcandy.png";
    this.speedFall = 3.5+speedLevel;
    this.score=15
    this.hungryBar=5
    this.restHungryBar=20
    
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  move = () => {
    this.y += this.speedFall;
  };
}
