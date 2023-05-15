class Ship {
    constructor(length){
        this.length = length;
        this.hitCount = 0;
        this.isSunk = false;
        this.orientation = 'x';
        this.ship = this;
    }

    hit() {
        this.hitCount++;
        if (this.hitCount === this.length) {
            this.isSunk = true;
        }
    }
}

class Gameboard {
    constructor() {
        this.board = [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
        ]
    }

    place(ship, [coordX, coordY]) {
        for (let y = 0; y < this.board.length; y++ ) {
            for (let x = 0; x < this.board[y].length; x++) {
                if (ship.orientation === 'x') {
                    if (y === coordY && (
                        x >= coordX && 
                        x < coordX + ship.length
                    )) {
                        this.board[y][x] = ship.ship;
                    }
                } else {
                    if (x === coordX && (
                        y >= coordY &&
                        y < coordY + ship.length
                    )) {
                        this.board[y][x] = ship.ship;
                    }
                }
                
            }
        }
    }

    receiveAttack([coordX, coordY]) {
        if (this.board[coordY][coordX] !== 0) {
            this.board[coordY][coordX].hit();
            this.board[coordY][coordX] = 'hit';
        } else {
            this.board[coordY][coordX] = 'miss';
        }
    }

    checkShipsSunk() {
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                if (typeof this.board[y][x] === 'object') {
                    return false;
                }
            }
        }
        return true;
    }
}



module.exports = {
    Ship,
    Gameboard
}