class Timeout {
  constructor(callbackFunction, time) {
    this.time = time;
    this.callback = callbackFunction; // la funcion a la que se llamara igual que el settimeout
    this.run(); // invocado automaticamente cuando se crea el objeto
  }
  run() {
    this.startedTime = new Date().getTime(); // guarda el tiempo en el que empieza a contar

    if (this.time > 0) {
      this.timeout = setTimeout(this.callback, this.time); // si el tiempo indicado es mayor que cero
    }
  }

  pause() {
    let currentTime = new Date().getTime(); // guarda el tiempo en el momento que se ejecuta el pause para restarlo y calcular el tiempo que le falta al timeout
    this.time = this.time - (currentTime - this.startedTime); // guarda el valor que queda por transcurrir
    clearTimeout(this.timeout);
  }
}
