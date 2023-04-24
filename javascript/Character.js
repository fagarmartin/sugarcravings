class Character {
  constructor() {
    this.groundPosition=150 // posicion para que parezca que esta sobre el suelo
    this.w = 80;
    this.h = 65;
    this.x = canvas.width/2;
    this.y = canvas.height-this.groundPosition; // se pondrá encima del terreno
    this.img = new Image();
    this.img.src = "images/character/char-right.png";
    this.speed=10
    this.isMovingRight=false
    this.isMovingLeft=false
    this.walkingRightSpriteFolder="images/character/walking-right/"
    this.maxSpritesNum=15
    this.countSprite=1
    this.animating;
    this.now;
    this.then;

  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
   
  };

  move=()=>{
   // 
    if(this.isMovingRight && this.x<canvas.width-this.w) // es true cuando se pulsa la tecla,false cuando se deja de pulsar
    {
       this.img.src = "images/character/char-right.png";       
       this.x+=this.speed 
     
        
    }
     if(this.isMovingLeft && this.x>0)
    {
        this.img.src = "images/character/char-left.png";
        this.x-=this.speed
   
    }
    
    
  }


 

}
