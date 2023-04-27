class Crave {
  constructor(candyimg) {
    this.x = canvas.width - 100;

    this.w = 80;
    this.h = 80;
    this.y = canvas.height - this.h - 5;
    this.img = new Image();
    this.img.src = "images/scene/frame.png";
    this.candyimg=new Image()
    this.candyimg.src=candyimg
    this.candyW=40
    this.candyH=40
    this.imgRed=new Image()
    this.imgRed.src="images/scene/framered.png"
    this.isRed=false
  }

  draw = () => {
    if(this.isRed)
    {
      ctx.drawImage(this.imgRed, this.x, this.y, this.w, this.h);
    }
    else{
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
    //ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
 
    ctx.drawImage(this.candyimg, this.x+(this.w/4), this.y+(this.w/4), this.candyW, this.candyH);
  };

  changeColorFrame=()=>{
    this.isRed=true
    setTimeout(() => {
      this.isRed=false
    }, 2000);
  }
}
