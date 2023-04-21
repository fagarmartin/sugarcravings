class Game{


constructor(){

    this.background=new Image()
    this.background.src="images/background.png"
    this.score=0
    this.hungryBar=0 // al principio porcentaje (?)
    this.character=new Character()
    this.sugar=new Candy(350)
    //this.character crear
    //this.caramelo crear mas adelante sera array
    
}
clearCanvas=()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
drawBackground=()=>{
    ctx.drawImage(this.background,0,0,canvas.width,canvas.height)
}
gameLoop=()=>
{
    //console.log("ENTRA")
//1. Limpieza del canvas
//this.clearCanvas()
//2. Acciones y movimiento de los elementos

this.character.move()
//3. Dibujado de los elementos
this.drawBackground()
this.character.draw()
this.sugar.draw()
//4. Recursion (requestAnimationFrame)

requestAnimationFrame(this.gameLoop)
}



}