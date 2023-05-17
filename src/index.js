const playerGrid = document.getElementById('playerGrid');
const computerGrid = document.getElementById('computerGrid');

const playerBoard = new Gameboard(playerGrid, false);
const playerOne = new Player(playerBoard);

const computerBoard = new Gameboard(computerGrid, true);
const computer = new Player(computerBoard);

computerBoard.randomlyPlaceShips();
//main game loop
