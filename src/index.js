class Ship {
    constructor(length){
        this.length = length;
        this.hitCount = 0;
        this.isSunk = false;
        this.orientation = 'x';
    }

    hit() {
        this.hitCount++;
        if (this.hitCount === this.length) {
            this.isSunk = true;
        }
    }
}





module.exports = {
    Ship
}