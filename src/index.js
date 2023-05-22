const playerGrid = document.getElementById('playerGrid');
const computerGrid = document.getElementById('computerGrid');
const startBtn = document.getElementById('startBtn');
const orientationBtn = document.getElementById('orientationBtn');
const victoryCover = document.getElementById('victoryCover');
const victoryMsg = document.getElementById('victoryMsg');
const restartBtn = document.getElementById('restartBtn');
const placeShipHeader = document.getElementById('placeShipHeader');
const shipCounter = document.getElementById('shipCounter');


const playerBoard = new Gameboard(playerGrid, false);
const playerOne = new Player(playerBoard);

const computerBoard = new Gameboard(computerGrid, true);
const computer = new Player(computerBoard);

computerBoard.randomlyPlaceShips();

let gameOver = false;
// computer.randomAttack(playerBoard)

function victory(pOne, computer) {
    if (pOne.gameOver || computer.gameOver) {
        victoryCover.style.visibility = 'visible';
        victoryMsg.style.visibility = 'visible';
        restartBtn.style.visibility = 'visible';
        //computerBoard.showShips();
        //computerBoard.update();
    }

    if (pOne.gameOver) {
        victoryMsg.textContent = "Computer Wins!";
    } else if (computer.gameOver) {
        victoryMsg.textContent = 'Player Wins!';
    }
}

restartBtn.addEventListener('click', function() {
    location.reload();
})

function computerGridListeners() {
    for (let y = 0; y < playerBoard.boardSize; y++) {
        for (let x = 0; x < playerBoard.boardSize; x++) {
            const tile = computerGrid.children[y].children[x];
            tile.addEventListener('click', function() {
                let playerCheck = computerBoard.isTurn;
                if (!playerCheck) {
                    computer.randomAttack(playerBoard);
                }
                computerBoard.update();
                victory(playerBoard, computerBoard);
            })
            tile.addEventListener('mouseenter', () => {
                if (!computerBoard.board[y][x].isShip ||
                    !computerBoard.board[y][x].isHit) {
                        tile.style.backgroundColor = 'var(--hover)';
                    }
                computerBoard.update();
            })
            tile.addEventListener('mouseleave', () => {
                if (!computerBoard.board[y][x].isShip ||
                    !computerBoard.board[y][x].isHit) {
                        tile.style.backgroundColor = 'var(--default)';
                    }
                computerBoard.update();
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
        placeShipHeader.style.visibility = 'hidden';
        placeShipHeader.style.position = 'absolute';
        shipCounter.style.visibility = 'hidden';

        computerBoard.clearPlaceable();
        playerBoard.clearPlaceable();
    }
})


computerGridListeners();