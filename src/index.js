const playerGrid = document.getElementById('playerGrid');
const computerGrid = document.getElementById('computerGrid');
const startBtn = document.getElementById('startBtn');
const orientationBtn = document.getElementById('orientationBtn');

const playerBoard = new Gameboard(playerGrid, false);
const playerOne = new Player(playerBoard);

const computerBoard = new Gameboard(computerGrid, true);
const computer = new Player(computerBoard);

computerBoard.randomlyPlaceShips();

let gameOver = false;
// computer.randomAttack(playerBoard)

function computerGridListeners() {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const tile = computerGrid.children[y].children[x];
            tile.addEventListener('click', function() {
                let playerCheck = computerBoard.isTurn;
                if (!playerCheck) {
                    computer.randomAttack(playerBoard);
                }
            })
        }
    }
}

function playerGridListeners() {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const tile = computerGrid.children[y].children[x];
            tile.addEventListener('mouseenter', function() {
                if (computerBoard.board[y][x].isHit === false) {
                    tile.style.backgroundColor = 'rgb(107, 104, 239)';
                }
            })
            tile.addEventListener('mouseleave', function() {
                if (computerBoard.board[y][x].isHit === false) {
                    tile.style.backgroundColor = 'white';
                }
            })
        }
    }
}

startBtn.addEventListener('click', function() {
    if (!playerBoard.placingShips) {
        playerGrid.style.position = 'absolute';
        playerGrid.style.left = '5%';
        orientationBtn.style.visibility = 'hidden';
        computerGrid.style.visibility = 'visible';
        startBtn.style.visibility = 'hidden';

        computerBoard.clearPlaceable();
        playerBoard.clearPlaceable();
    }
})


computerGridListeners();
//playerGridListeners();