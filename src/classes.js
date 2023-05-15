class Ship {
    constructor(length) {
        this.length = length;
        this.hitCount = 0;
        this.isSunk = false;
        this.orientation = 'x';
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
}

class Gameboard {
    constructor(elementContainer) {
        this.board = elementContainer;
        this.boardSize = 10;
        this.currentShip = null;
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
            }
            this.board.appendChild(row);
        }
    }

    loadShip(ship) {
        this.currentShip = ship;
    }

    showShip(tile, ship) {
        const board = Array.prototype.slice.call(this.board.children);
        board.forEach((row) => {
            const allRows = Array.prototype.slice.call(row.children);
            allRows.forEach((tile) => {
                tile.classList.remove('hover');
            })
        })
        switch (ship.length) {
            case 1: 
                tile.classList.add('hover');
                break;
            case 2:
                tile.classList.add('hover');
                tile.nextSibling.classList.add('hover');
            case 3:
                tile.classList.add('hover');
                tile.nextSibling.classList.add('hover');
                tile.nextSibling.nextSibling.classList.add('hover');
            case 4:
                tile.classList.add('hover');
                tile.nextSibling.classList.add('hover');
                tile.nextSibling.nextSibling.classList.add('hover');
                tile.nextSibling.nextSibling.nextSibling.classList.add('hover');
        }
    }
}