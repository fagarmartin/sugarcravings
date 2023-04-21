class Character {
  constructor() {
    this.w = 80;
    this.h = 65;
    this.x = canvas.width/2;
    this.y = canvas.height-150; // se pondrá encima del terreno
    this.img = new Image();
    this.img.src = "images/character/char-right.png";
    this.speed=10
    this.isMovingRight=false
    this.isMovingLeft=false
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    //console.log("PINTA")
  };

  move=()=>{
   // 
    if(this.isMovingRight) // es true cuando se pulsa la tecla,false cuando se deja de pulsar
    {
        
        this.x+=this.speed
    }
     if(this.isMovingLeft)
    {
        this.x-=this.speed
        console.log(this.isMovingleft)
    }
    
  }
 

}
