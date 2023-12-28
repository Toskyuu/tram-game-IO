import Obstacle from "./Obstacle.mjs";
import Tram from "./Tram.mjs";
import TramStop from "./TramStop.mjs";

class Game {
  #canvas = document.getElementById("board");
  #context = this.#canvas.getContext("2d");
  #tram = new Tram(this.#context, 1);
  #obstaclesList = [];
  #karolIMG = new Image();
  #tramStopList = [];
  #currentTramStop;
  #score = 0;
  #scoreElement = document.getElementById("score");
  #freeSeatsElement = document.getElementById("freeseats");
  #pickedPassengersElement = document.getElementById("passengers");

  constructor(){
    this.start();
  }

  dropOffPassengers(){
    try{
      this.#currentTramStop.pickPassengers();
      if(this.#tram.getPassengersToPickup() === this.#tram.getPickedPassengers()){
        this.#score += this.#tram.getPickedPassengers() * 1.5;
        this.#tram.dropOffPassengers();
      }
      else{
        this.#score += this.#tram.getPickedPassengers();
        this.#tram.dropOffPassengers();
      }
      
    }
    catch{
      console.error("Brak obiektu tramStop");
    }
  }

  pickPassengers() {
    console.log("Proba podjeta");
    try{
      const passengers = this.#currentTramStop.pickPassengers();
      this.#tram.pickupPassengers(passengers);
    }
      catch{
        console.error("Brak obiektu tramStop");
      }
 
      
  }
  getCanvas() {
    return this.#canvas;
  }
  getTram() {
    return this.#tram;
  }
  drawBackground() {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    // const img = new Image();
    // img.src = "../img/rails.png";
    // const pattern = this.#context.createPattern(img, "repeat");

    // this.#context.fillStyle = pattern;
    // this.#context.fillRect(0, 20, this.#canvas.width, 50);

    // this.#context.fillStyle = pattern;
    // this.#context.fillRect(0, 120, this.#canvas.width, 50);

    // this.#context.fillStyle = pattern;
    // this.#context.fillRect(0, 240, this.#canvas.width, 50);
  }

  drawAll() {
    this.drawBackground();
    this.#scoreElement.textContent = this.#score.toString();
    this.#freeSeatsElement.textContent = this.#tram
      .getPassengersToPickup()
      .toString();
    this.#pickedPassengersElement.textContent = this.#tram.getPickedPassengers().toString();
    this.#tramStopList.forEach((tramStop) => {
      tramStop.draw();
    });

    this.#obstaclesList.forEach((obst) => {
      obst.draw();
    });
    this.#tram.draw();
  }

  generateTramStop() {
    const track = Math.floor(Math.random() * 3);
    const passengersWaiting = Math.floor(Math.random() * 50);
    const minDistance = 800;
    const lastTramStop = this.#tramStopList[this.#tramStopList.length - 1];
    const distance = lastTramStop
      ? 800 - lastTramStop.getX() - lastTramStop.getWidth()
      : Infinity;

    if (distance >= minDistance) {
      const newTramStop = new TramStop(
        passengersWaiting,
        this.#context,
        track,
        5,
        200
      );
      this.#tramStopList.push(newTramStop);
    }
  }
  generateObstacle() {
    const track = Math.floor(Math.random() * 3);
    const minDistance = 200;

    const lastObstacle = this.#obstaclesList[this.#obstaclesList.length - 1];
    const distance = lastObstacle
      ? 800 - lastObstacle.getX() - lastObstacle.getWidth()
      : Infinity;

    if (distance >= minDistance) {
      const newObstacle = new Obstacle(track, this.#context, 5, 50);
      this.#obstaclesList.push(newObstacle);
    }
  }
  update() {
    if (Math.random() < 0.02) {
      // this.generateObstacle();
    } else if (Math.random() > 0.99) {
      this.generateTramStop();
    }
    this.#currentTramStop = null;
    for (let i = this.#tramStopList.length - 1; i >= 0; i--) {
      this.#tramStopList[i].update();

      if (this.#tramStopList[i].checkCloseness(this.#tram)) {
        this.#currentTramStop = this.#tramStopList[i];
      } 

      if (this.#tramStopList[i].getX() + this.#tramStopList[i].getWidth() < 0) {
        this.#tramStopList.splice(i, 1);
      }
    }

    for (let i = this.#obstaclesList.length - 1; i >= 0; i--) {
      this.#obstaclesList[i].update();

      if (this.checkCollision(this.#tram, this.#obstaclesList[i])) {
        this.endGame();
      }

      if (
        this.#obstaclesList[i].getX() + this.#obstaclesList[i].getWidth() <
        0
      ) {
        this.#obstaclesList.splice(i, 1);
      }
    }
    this.drawAll();
  }

  checkCollision(tram, obstacle) {
    return (
      tram.getX() < obstacle.getX() + obstacle.getWidth() &&
      tram.getX() + tram.getWidth() > obstacle.getX() &&
      tram.getTrack() === obstacle.getTrack()
    );
  }
  endGame() {
    this.#karolIMG.src = "../img/karol.jpg";
    this.playEngGameSound();

    setTimeout(() => {
      alert("Game Over!");
    }, 10);
    this.#obstaclesList = [];
    this.#tram = new Tram(this.#context, 1);
    this.#score = 0;
    this.start();
  }
  playEngGameSound() {
    const sound = new Audio("../czego.mp3");
    document.body.appendChild(sound);
    sound.play();
  }
  start() {
    this.gameLoop();
  }
  gameLoop() {
    this.update();
    requestAnimationFrame(() => this.gameLoop());
  }
}

export default Game;
