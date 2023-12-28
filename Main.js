import Game from "./modules/Game.mjs";
import Menu from "./modules/Menu.mjs"

const menu = new Menu();
menu.getCanvas().addEventListener('click', (event) => {
  menu.handleMouseClick(event);
});

document.getElementById('start-button').addEventListener('click', () => {
  menu.startGame();
});

