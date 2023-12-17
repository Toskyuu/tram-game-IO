import Obstacle from "./Obstacle.mjs";
import Tram from "./Tram.mjs";

class Game {
  #canvas = document.getElementById("board");
  #context = this.#canvas.getContext("2d");
  #tram = new Tram(this.#context, 1);
  #obstaclesList = [];
  // #karolIMG = new Image();

  getCanvas() {
    return this.#canvas;
  }
  getTram() {
    return this.#tram;
  }
  drawBackground() {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    const img = new Image();
    img.src = "../img/rails.png";
    img.onload = () => {
      const pattern = this.#context.createPattern(img, "repeat");

      // Druga sekcja
      this.#context.fillStyle = pattern;
      this.#context.fillRect(0, 20, this.#canvas.width, 40);

      // Trzecia sekcja
      this.#context.fillStyle = pattern;
      this.#context.fillRect(0, 120, this.#canvas.width, 40);

      // Czwarta sekcja
      this.#context.fillStyle = pattern;
      this.#context.fillRect(0, 240, this.#canvas.width, 40);
    };
  }

  drawAll() {
    this.drawBackground();
    this.#tram.draw();
    this.#obstaclesList.forEach((obst) => {
      obst.draw();
    });
  }

  generateObstacle() {
    const track = Math.floor(Math.random() * 3);
    const minDistance = 80;

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
      this.generateObstacle();
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
    // this.#karolIMG.src = "../img/karol.jpg";
    this.playEngGameSound();

    setTimeout(() => {
      alert("Game Over!");
    }, 10);
    this.#obstaclesList = [];
    this.start();
    this.#tram.setTrack(1);
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
