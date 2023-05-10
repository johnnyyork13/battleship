const Ship = {
    player: null,
    length: null,
    hitCount: 0,
    isSunk: false,
    orientation: 'x',
    hit() {
        this.hitCount++;
        if (this.hitCount === this.length) {
            this.isSunk = true;
        }
    }
}

const Gameboard = {
    grid: [
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
    ],
    addShipToGrid(player, ship, loc){
        ship.player = player;
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                if (ship.orientation === 'x' &&
                    y === loc[1] &&
                    (x >= loc[0] &&
                    x < loc[0] + ship.length)) {
                        this.grid[y][x] = ship;
                } else if (ship.orientation === 'y' && 
                    x === loc[0] &&
                    (y >= loc[1] && y < loc[1] + ship.length)) {
                        this.grid[y][x] = ship;
                    }
            }
        }
    },
    receiveAttack(loc){
        const coord = this.grid[loc[1]][loc[0]];
        if (coord === 0) {
            this.grid[loc[1]][loc[0]] = 1;
        } else if (coord.player !== null) {
            coord.hitCount++;
            this.grid[loc[1]][loc[0]] = 'X';
        }
    }
}

const Player = {
    name: null,
    symbol: null,
    score: 0,
}





module.exports = {
    Ship,
    Gameboard,
    Player
}