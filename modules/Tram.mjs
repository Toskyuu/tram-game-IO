class Tram {
  #width = 135;
  #pickedPassengers = 0;
  #track;
  #context;
  #passengersToPickup = 100;
  #tramIMG = new Image();
  #level;
  constructor(context, track, level) {
    this.#context = context;
    this.#track = track;
    this.#tramIMG.src = "../img/tram.png";
    this.#tramIMG.crossOrigin = "Anonymous";
    this.#level = level;
  }
  draw() {
    this.#context.drawImage(
      this.#tramIMG,
      50,
      this.#track * 100 + 20 - 80,
      140,
      200
    );
  }
  moveDown() {
    if (this.#track < this.#level + 2) {
      setTimeout(() => {
        this.#track++;
      }, 100);
    }
  }
  moveUp() {
    if (this.#track > 0) {
      setTimeout(() => {
        this.#track--;
      }, 100);
    }
  }
  getTrack() {
    return this.#track;
  }
  setTrack(track) {
    this.#track = track;
  }
  getX() {
    return 50;
  }
  getWidth() {
    return this.#width;
  }
  pickupPassengers(passengers) {
    if (this.#pickedPassengers + passengers <= this.#passengersToPickup) {
      this.#pickedPassengers += passengers;

    } else {
      this.#pickedPassengers = this.#passengersToPickup;
    }
  }
  dropOffPassengers() {
    this.#pickedPassengers = 0;
  }
  getPassengersToPickup() {
    return this.#passengersToPickup;
  }
  getPickedPassengers() {
    return this.#pickedPassengers;
  }
}

export default Tram;
