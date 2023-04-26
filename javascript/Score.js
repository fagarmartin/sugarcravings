class Score{

    constructor(){
        this.x=canvas.width-150
        this.y=50
        this.shadowGap=5
        this.font="48px serif"
        this.strokeStyleShadow="rgba(110, 110, 110, 0.1)"
        this.strokeStyleFont="#00baba"
        this.fillStyle="white"
        this.lineWidth=4
        this.value=0

    }

    draw=()=>{
    ctx.fillStyle = this.strokeStyleShadow
    ctx.font = this.font;
    ctx.strokeStyle = this.strokeStyleShadow
    ctx.lineWidth = this.lineWidth;
    ctx.strokeText(this.value, this.x, this.y+this.shadowGap)
    ctx.fillText(this.value, this.x+this.shadowGap, this.y+this.shadowGap); // sombreado
   
    ctx.strokeStyle = this.strokeStyleFont;
    ctx.lineWidth = this.lineWidth;
    ctx.strokeText(this.value, this.x, this.y)
    ctx.fillStyle = "white";
    ctx.fillText(this.value, this.x, this.y);
    }
}