const playerGrid = document.getElementById('playerGrid');
const computerGrid = document.getElementById('computerGrid');

const playerBoard = new Gameboard(playerGrid, false);
const playerOne = new Player(playerBoard);

const computerBoard = new Gameboard(computerGrid, true);
const computer = new Player(computerBoard);

computerBoard.randomlyPlaceShips();
//main game loop
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

computerGridListeners();
//playerGridListeners();