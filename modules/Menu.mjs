import Game from "./Game.mjs"
class Menu{
    #canvas = document.getElementById("board");
    #context = this.#canvas.getContext("2d");
    #levels = ["Level 1", "Level 2", "Level 3"];
    #selectedLevel = null;

    constructor(){
        this.drawMenu();
    }

    drawMenu(){
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    this.#context.fillStyle = 'black';
    this.#context.font = '30px Arial';
    this.#context.fillText('Game Title', this.#canvas.width / 2 - 80, 50);

    this.#context.font = '20px Arial';

    for (let i = 0; i < this.#levels.length; i++) {
      const buttonY = 100 + i * 40;
      this.#context.fillStyle = this.#selectedLevel === i ? 'red' : 'blue';
      this.#context.fillRect(this.#canvas.width / 2 - 50, buttonY - 20, 100, 30);
      this.#context.fillStyle = 'white';
      this.#context.fillText(this.#levels[i], this.#canvas.width / 2 - 30, buttonY);
    }
  }

  

    handleMouseClick(event) {
        const rect = this.#canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
    
        for (let i = 0; i < this.#levels.length; i++) {
          const buttonY = 100 + i * 40;
          if (
            mouseX >= this.#canvas.width / 2 - 50 &&
            mouseX <= this.#canvas.width / 2 + 50 &&
            mouseY >= buttonY - 20 &&
            mouseY <= buttonY + 10
          ) {
            this.#selectedLevel = i;
            console.log("hello" + i);
            this.drawMenu();
            break;
          }
        }
    }


    startGame() {
        if (this.#selectedLevel !== null) {
          const gra = new Game();
          gra.getCanvas().focus();
          gra.getCanvas().addEventListener("keydown", (event) => {
            switch (event.key) {
              case "w":
                gra.getTram().moveUp();
                break;
              case "s":
                gra.getTram().moveDown();
                break;
              case "a":
                gra.pickPassengers();
                break;
              case "d":
                gra.dropOffPassengers();
                break;
            }
          });
        }
      }
    

    getCanvas(){
        return this.#canvas;

    }

    
}
export default Menu;