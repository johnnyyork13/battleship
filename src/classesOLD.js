class Ship {
    constructor(length) {
        const rotateBtn = document.getElementById('rotateBtn');
        rotateBtn.addEventListener('click', () => {
            this.rotate();
        })
        this.length = length;
        this.hitCount = 0;
        this.isSunk = false;
        this.orientation = 'y';
    }

    hit() {
        this.hitCount++;
        if (this.hitCount === this.length) {
            this.isSunk();
        }
    }

    isSunk() {
        this.isSunk = true;
        //maybe do other stuff later
    }

    rotate() {
        if (this.orientation === 'x') {
            this.orientation = 'y';
        } else {
            this.orientation = 'x';
        }
    }
}

class Gameboard {
    constructor(elementContainer) {
        this.board = elementContainer;
        this.boardSize = 10;
        this.currentShip = null;
        this.tileCoords = null;
        //for testing
        this.counter = 0;
        for (let y = 0; y < this.boardSize; y++) {
            let row = document.createElement('div');
            row.className = 'row';
            for (let x = 0; x < this.boardSize; x++) {
                let tile = document.createElement('div');
                tile.className = 'tile';
                tile.textContent = this.counter;
                this.counter++;
                row.appendChild(tile);
                tile.addEventListener('click', () => {
                    //this.showShip(tile);
                })
                tile.addEventListener('mouseenter', () => {
                    if (this.currentShip !== null) {
                        this.showShip(tile, this.currentShip);
                    }
                })
                tile.addEventListener('mouseleave', () => {
                    if (this.currentShip !== null) {
                        this.showShip(tile, this.currentShip);
                    }
                })
            }
            this.board.appendChild(row);
        }
    }

    loadShip(ship) {
        this.currentShip = ship;
    }

    showShip(tile, ship) {
        let eCoords;
        const board = Array.prototype.slice.call(this.board.children);
        board.forEach((row) => {
            const allRows = Array.prototype.slice.call(row.children);
            allRows.forEach((e) => {
                try {
                    if (e === tile) {
                        console.log('tiled');
                        this.tileCoords = [allRows.indexOf(tile), board.indexOf(row)]
                    }
                    eCoords = [allRows.indexOf(e), board.indexOf(row)];
                    if (ship.orientation === 'x') {
                        if (eCoords[0] >= this.tileCoords[0] &&
                            eCoords[0] < this.tileCoords[0] + ship.length &&
                            eCoords[1] === this.tileCoords[1]) {
                           e.classList.add('hover');
                       } else {
                           e.classList.remove('hover');
                       }
                    } else {
                        if (eCoords[0] === this.tileCoords[0] &&
                            eCoords[1] >= this.tileCoords[1] &&
                            eCoords[1] < this.tileCoords[1] + ship.length) {
                                e.classList.add('hover');
                        } else {
                            e.classList.remove('hover');
                        }
                    }
                } catch {
                    console.log('no');
                }
                
                
                
            })
        })
        // switch (ship.length) {
        //     case 1: 
        //         tile.classList.add('hover');
        //         break;
        //     case 2:
        //         tile.classList.add('hover');
        //         tile.nextSibling.classList.add('hover');
        //     case 3:
        //         tile.classList.add('hover');
        //         tile.nextSibling.classList.add('hover');
        //         tile.nextSibling.nextSibling.classList.add('hover');
        //     case 4:
        //         tile.classList.add('hover');
        //         tile.nextSibling.classList.add('hover');
        //         tile.nextSibling.nextSibling.classList.add('hover');
        //         tile.nextSibling.nextSibling.nextSibling.classList.add('hover');
        // }
    }
}