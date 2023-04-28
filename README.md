# Sugar Cravings

## [Juego!](https://redkouya.github.io/sugarcravings/)

![Logo del juego](https://github.com/redkouya/sugarcravings/blob/main/images/screens/splashscreen/logo.png?raw=true)


# Descripciones
``
Ayuda a nuestro amigo verde a comer todos los caramelos que pueda. Por suerte caen del cielo todo el rato. 
Cuidado porque es muy quisquilloso y sólo le gustará un tipo de dulce según el momento.

# Main Functionalities

- Movimiento del personaje horizontal pulsando teclas A y D.

- Creación de caramelos y movimiento vertical de caida.

- Recolección de caramelos por parte del personaje.

- Aumento o disminución de barra de vida según coja los caramelos correctos o no.

- Aumento de Score según puntuación de los distintos caramelos.

- Aparición de enemigo cuando se sube de nivel.

- Cambios de imagen del personaje según estado en el que se encuentre.

- Dibujado de personajes, caramelos, barra de vida, puntuación y caramelo "antojo".


# Futuras Funcionalidades

- Cambiar el caramelo del antojo cuando lleva cogidos 10 caramelos seguidos

- Añadir nuevos caramelos

- Añadir cambio de imagen al chocar el caramelo con el suelo

- Añadir una estrella que vaya moviéndose por la pantalla que al cogerla haga que todos los caramelos sumen puntos y no te hagan daño.



# Tecnologías usadas

- HTML, CSS, Javascript, DOM Manipulation, Canvas, Local Storage.

# Estados

- Pantalla de inicio
- Juego
- Game over.



# Estructura del proyecto

- List here sections for your your different JS files.
- One for main.js to manage DOM elements, one for the Game class and one for each other class file of your game.
- Inside each file you can list the functions, clases, properties and methods of your code.

Example:

## main.js

- restartGame
- startAudio
- startGame
- checkKeyDown
- pause

## Game.js

- Game () {
    this.player;
	this.hungerBarUI 
    this.background    
    this.score
    this.character 
    this.candyArr 
    this.respawnGapY 
    this.candyCollisionGap 
    this.candyCreationGap
    this.isGameOn
    this.crave
    this.randomCrave 
    this.arrayLevels 
    this.arrayIsLevel
    this.sumaVelocidadLevel
    this.restBarLevel 
    this.maxLevel 
    this.currentLevel
    this.maxHungryBar
    this.randomLimit 
    this.isInmortal 
    this.maxRandomBlackBug 
    this.minRandomBlackBug 
    this.firstTime 
}

- checkCollisionCandy() {}
- checkCollisionBug() {}
- checkScoreZero() {}
- createBlackBug() {}
- changeDifficulty() {}
- gameLoop() {}


## Character.js 

- Player () {
this.groundPosition = 150; // posicion para que parezca que esta sobre el suelo
    this.w
    this.h 
    this.x 
    this.y
    this.img
    this.speed
    this.isMovingRight 
    this.isMovingLeft 
    this.isEating 
    this.eatingImg
	damagedWalkRightImg
	this.audioEating
}
- draw () {}
- move () {}
- startDisgusted () {}
- damageScore () {}
- startEatCrave() {}

## CandyRed.js

	this.w 
    this.h    
    this.x
    this.y
    this.img    
    this.speedFall 
    this.score
    this.hungryBar
    this.restHungryBar
	
- draw () {}
- move () {}

## CandyYelow.js
## CandyCookie.js
## CandyCake.js
## BlackBug.js
## Crave.js
## HungerBar.js
## Timeout.js



# Extra Links 


### Slides
[Link](www.your-slides-url-here.com)

## Deploy

[Link] (https://redkouya.github.io/sugarcravings/)
