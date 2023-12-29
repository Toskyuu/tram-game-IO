class Obstacle {
  #track;
  #context;
  #x = 1200;
  #y;
  #height = 40;
  #width;
  #speed;
  #Img = new Image();
  constructor(track, context, speed, width) {
    this.#track = track;
    this.#context = context;
    this.#speed = speed;
    this.#y = this.#track * 100 + 20;
    this.#width = width;
    let number = Math.random();
    if (number < 0.6) {
      this.#Img.src = "../img/car.png";
    } else if (number < 0.95) {
      this.#Img.src = "../img/hole.png";
    } else {
      this.#Img.src = "../img/norek.png";
    }
  }
  draw() {
    this.#context.drawImage(this.#Img, this.#x, this.#y, 80, 60);
  }

  getTrack() {
    return this.#track;
  }
  setTrack(track) {
    this.#track = track;
  }
  getX() {
    return this.#x;
  }
  getWidth() {
    return this.#width;
  }
  update() {
    this.#x -= this.#speed;
  }
}

export default Obstacle;
