class HungerBar{

    constructor(){
        this.x=15
        this.y=15
        this.w=200
        this.h=20
        this.value=50
    }


    draw=()=>{
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "darkblue";
        ctx.rect(this.x, this.y,  this.w, this.h);
        ctx.stroke();
        ctx.fillStyle="white"
        ctx.fillRect(this.x,this.y,this.w,this.h)

        let valorProp=(this.w*this.value)/100 // porcentaje en pixeles de la barra
        if(this.value>50)
        {
            ctx.fillStyle="green"
        }
        else if(this.value<=50)
        {
            ctx.fillStyle="yellow"
        }
        else{
            ctx.fillStyle="red"
        }
        ctx.fillRect(this.x,this.y,valorProp,this.h)
    }
}