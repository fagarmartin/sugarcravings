class Crave {
  constructor(candyimg) {
    this.x = canvas.width - 100;

    this.w = 80;
    this.h = 80;
    this.y = canvas.height - this.h - 5;
    this.img = new Image();
    this.img.src = "images/scene/frame.png";
    this.candyimg = new Image();
    this.candyimg.src = candyimg;
    this.candyW = 40;
    this.candyH = 40;
    this.imgRed = new Image();
    this.imgRed.src = "images/scene/framered.png";
    this.isRed = false;
    this.timeOutColorChange;
    this.timeOutMsg;
  }

  draw = () => {
    if (this.isRed) {
      ctx.drawImage(this.imgRed, this.x, this.y, this.w, this.h);
    } else {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
   
    ctx.drawImage(
      this.candyimg,
      this.x + this.w / 4,
      this.y + this.w / 4,
      this.candyW,
      this.candyH
    );
  };
  timedMessage=(msgDom,msg,time)=>{
    console.log("TIMED MESSAGE",msg)
    msgDom.innerText=msg
    this.timeOutMsg=new Timeout(()=>{
      msgDom.innerText=""

    },time)
  }

messages=(msg)=>{
  msgInGame.innerText=msg
}
  changeColorFrame = () => {
    this.messages("Watch out! The candy has changed!")
    this.isRed = true;
    this.timeOutColorChange=new Timeout(()=>{
      this.isRed = false;
      msgInGame.innerText=""
    },4000)
   
   /* setTimeout(() => {
      this.isRed = false;
      msgInGame.innerText=""
    }, 4000);*/
  };
}
