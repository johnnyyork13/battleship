class Ship {
    constructor(length) {
        this.length = length;
        this.hitCount = 0;
        this.isSunk = false;
        this.orientation = 'x';
        this.orientationBtn = document.getElementById('orientationBtn');
        this.orientationBtn.addEventListener('click', () => {
            if (this.orientation === 'x') {
                this.orientation = 'y';
            } else {
                this.orientation = 'x';
            }
        })
    }

    hit() {
        this.hitCount++;
        if (this.hitCount === this.length) {
            this.isSunk = true;
        }
    }

    checkIfSunk() {
        return this.isSunk;
    }
}

class Gameboard {
    constructor(e, isComputer) {
        this.isComputer = isComputer;
        this.clicked = [];
        this.hover = [];
        this.board = [];
        this.init();
        this.draw(e);
        this.click(e)
        this.gameOver = false;
        this.e = e;
        this.placingShips = true;
        //ships
        this.shipCount = 4;
        this.carrier = new Ship(5);
        this.battleship = new Ship(4);
        this.cruiser = new Ship(3);
        this.submarine = new Ship(2);
        this.destroyer = new Ship(1);
        this.shipList = [this.destroyer, this.submarine, this.cruiser, this.battleship, this.carrier];
    }

    init() {
        let boardSize = 10;
        for (let y = 0; y < boardSize; y++) {
            let newRow = [];
            for (let x = 0; x < boardSize; x++) {
                newRow.push({isShip: false, isHit: false, isPlaceable: true});
            }
            this.board.push(newRow);
        }
    }

    showShipForPlacement(ship, coords) {
        if (this.placingShips && !this.isComputer) {
            let hoverColor = 'rgb(255, 144, 144)';
            for (let y = 0; y < this.board.length; y++) {
                for (let x = 0; x < this.board[y].length; x++) {
                    if (ship.orientation === 'x') {
                        if ((x >= coords[0] && x < coords[0] + ship.length &&
                                y === coords[1]) && this.e.children[y].children[x].style.backgroundColor !== 'red') {
                                this.e.children[y].children[x].style.backgroundColor = hoverColor;
                        } else if ((x < coords[0] || x >= coords[0] + ship.length ||
                                    y !== coords[1]) && this.e.children[y].children[x].style.backgroundColor !== 'red') {
                                        this.e.children[y].children[x].style.backgroundColor = 'white';
                        }
                    } else {
                        if ((x === coords[0] && y >= coords[1] && y < coords[1] + ship.length) &&
                            this.e.children[y].children[x].style.backgroundColor !== 'red') {
                            this.e.children[y].children[x].style.backgroundColor = hoverColor;
                        } else if ((x !== coords[0] || y < coords[1] || y >= coords[1] + ship.length) &&
                            this.e.children[y].children[x].style.backgroundColor !== 'red') {
                            this.e.children[y].children[x].style.backgroundColor = 'white';
                        }
                    }
                }
            }
        }
    }
    checkPlaceable(ship, coords) {
        console.log(coords);
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                if (ship.orientation === 'x' && x >= coords[0] && x < coords[0] + ship.length &&
                    y === coords[1]) {
                        if (!this.board[y][x].isPlaceable || !this.board[y][x - 1].isPlaceable 
                            || !this.board[y + 1][x].isPlaceable) {
                                return false;
                            }
                }
            }
        }
        return true;
    }

    placeShip(ship, coords) {
        let placeable = this.checkPlaceable(ship, coords);
        if (placeable) {
            for (let i = 0; i < ship.length; i++) {
                if (ship.orientation === 'x') {
                    this.board[coords[1]][coords[0] + i].isShip = true;
                    this.board[coords[1]][coords[0] + 1].isPlaceable = false;
                } else {
                    this.board[coords[1] + i][coords[0]].isShip = true; 
                    this.board[coords[1]][coords[0] + 1].isPlaceable = false;
                }
            }
        }
        
    }

    receiveAttack(coords) {
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                if (coords[0] === x && coords[1] === y && 
                    this.board[y][x].isHit === false) {
                        this.board[y][x].isHit = true;
                        return true;
                } else if (coords[0] === x && coords[1] === y &&
                    this.board[y][x].isHit === true) {
                        return false;
                }
            }
        }
    }

    checkShips() {
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                if (this.board[y][x].isShip === true &&
                    this.board[y][x].isHit === false) {
                    return false;
                }
            }
        }
        return true;
    }

    draw(e) {
        let defaultBackground = 'white';
        let shipBackground = 'red';

        for (let y = 0; y < this.board.length; y++) {
            let row = document.createElement('div');
            row.className = 'row';
            for (let x = 0; x < this.board[y].length; x++) {
                let tile = document.createElement('div');
                tile.className = 'tile';
                if (this.board[y][x].isShip === false) {
                    tile.style.backgroundColor = defaultBackground;
                } else if (this.board[y][x].isShip === true) {
                    tile.style.backgroundColor = shipBackground;
                }
                row.appendChild(tile);
            }
            e.appendChild(row);
        }
    }

    update(e) {
        if (!this.gameOver) {
            for (let y = 0; y < this.board.length; y++) {
                for (let x = 0; x < this.board[y].length; x++) {
                    (this.board[y][x].isShip) ? e.children[y].children[x].style.backgroundColor = 'red' :
                                                    e.children[y].children[x].style.backgroundColor = 'white';
                    if (this.board[y][x].isHit) {
                        e.children[y].children[x].style.backgroundColor = 'blue';
                    }
                }
            }
        }
        
        this.gameOver = this.checkShips();
    }

    click(e) {
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                e.children[y].children[x].addEventListener('click', () => {
                    this.clicked = [x, y];
                    if (!this.placingShips) {
                        this.receiveAttack(this.clicked);
                        this.update(e);
                    } else {
                        console.log(this.clicked);
                        let placed = this.placeShip(this.shipList[this.shipCount], this.clicked);
                        this.update(this.e);
                        if (placed) {
                            this.shipCount--;
                        }
                        if (this.shipCount < 0) {
                            this.placingShips = false;
                        }
                    }

                })
                e.children[y].children[x].addEventListener('mouseenter', () => {
                    if (this.placingShips) {
                        this.hover = [x, y];
                        this.showShipForPlacement(this.shipList[this.shipCount], this.hover);
                    }
                })
            }
        }
    }

    randomlyPlaceShips() {
        for (let i = 0; i <= this.shipCount; i++) {
            let randomX = Math.floor(Math.random() * 9);
            let randomY = Math.floor(Math.random() * 9);
            let ship = this.shipList[i];
            //randomly assign x or y orientation
            let randomOrientation = Math.floor(Math.random() * 2);
            if (randomOrientation === 1) {
                ship.orientation = 'x';
            } else {
                ship.orientation = 'y';
            }
            if (randomX + ship.length > 9 ) {
                let overAmount = randomX + ship.length - 9;
                randomX -= overAmount;
            }
            if (randomY + ship.length > 9) {
                let overAmount = randomY + ship.length - 9;
                randomY -= overAmount;
            }
            this.placeShip(ship, [randomX, randomY]);
        }
        this.update(this.e);
    }
    
}

class Player {
    constructor(gameboard) {
        this.isTurn = true;
        this.shipCount = 5;
        this.board = gameboard.board;
        this.gameboard = gameboard;
        this.clicked = [0,0];
    }

    startGame(coords) {
        if (this.isTurn && this.shipCount >= 0) {
            this.gameboard.placeShip(coords)
            return true;
        } else {
            return false;
        }
    }

}

// module.exports = {
//     Ship,
//     Gameboard,
//     Player
// }