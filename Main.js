import Game from "./modules/Game.mjs";

const gra = new Game();
gra.start();

gra.getCanvas().focus();

gra.getCanvas().addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      gra.getTram().moveUp();
      break;
    case "s":
      gra.getTram().moveDown();
      break;
  }
});
