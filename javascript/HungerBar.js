class HungerBar {
  constructor() {
    this.x = 15;
    this.y = 15;
    this.w = 200;
    this.h = 20;
    this.value = 30;
    this.canLoseValue = true; // se pondra a false X tiempo cuando se cambie el caramelo bueno, para no perder vida en ese tiempo
    this.timeFreeze = 5000;
  }

  draw = () => {
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "darkblue";
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.w, this.h);

    let valorProp = (this.w * this.value) / 100; // porcentaje en pixeles de la barra
    if (this.value > 50) {
      ctx.fillStyle = "green";
    } else if (this.value <= 50) {
      ctx.fillStyle = "yellow";
    } else if (this.value < 30) {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(this.x, this.y, valorProp, this.h);
  };
  valueFreeze = () => {
   
    // sera llamado cuando cambie el caramelo bueno para dejar un margen de reaccion al usuario
    this.canLoseValue = false;
   
    setTimeout(() => {
      this.canLoseValue = true;
    
    }, this.timeFreeze);
  };

  sumValue = (eachScore) => {
    this.value += eachScore;
  };

  restValue = (eachScore) => {
    if (this.canLoseValue) {
      this.value -= eachScore;
    }
  };
}
