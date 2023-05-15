const playerGrid = document.getElementById('playerGrid');

const playerBoard = new Gameboard(playerGrid);

//test ship
const testShip = new Ship(4);

playerBoard.loadShip(testShip);