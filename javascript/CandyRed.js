class CandyRed  {
  constructor(positionX,speedLevel) {
  
    this.w = 40;
    this.h = 40;
    if(positionX>=canvas.width)
    {
      this.x=positionX-this.w
    }
    else if(positionX<=this.w)
    {
      this.x=this.w
    //  console.log("ENTRA X",this.x)
    }else{
      this.x=positionX
    }   
    
    this.y = 0-this.h;
    this.img = new Image();
    this.img.src = "images/sugar/redcandy.png";
    this.speedFall = 4+speedLevel;
    this.score=25
    this.hungryBar=10
    this.restHungryBar=15
    
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  move = () => {
    this.y += this.speedFall;
  };

  
}
