const {Ship, Gameboard, Player} = require('../src/index');

const shipFactory = () => Object.create(Ship);
const gameboardFactory = () => Object.create(Gameboard);
const myGameboard = gameboardFactory();
const newPlayer = () => Object.create(Player);
const playerOne = newPlayer();

test('Ship Length Default', () => {
    const myShip = shipFactory()
    expect(myShip.length).toBe(null);
})
test('Ship Hit', () => {
    const myShip = shipFactory();
    myShip.hit();
    expect(myShip.hitCount).toBe(1);
})
test('Sunk Ship', () => {
    const myShip = shipFactory();
    myShip.length = 3;
    myShip.hit();
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk).toBe(true);
}) 

test('Placed Ship X', () => {
    const myShip = shipFactory();
    playerOne.symbol = 1;
    myShip.length = 2;
    myGameboard.addShipToGrid(playerOne, myShip, [0,0]);
    const testGrid = [
        [myShip,myShip,0,0,0,0,0,0,0,0],
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
    expect(myGameboard.grid).toStrictEqual(testGrid);
})

test('Placed Ship Y', () => {
    const myShip = shipFactory();
    playerOne.symbol = 1;
    myShip.orientation = 'y';
    myShip.length = 3;
    myGameboard.addShipToGrid(playerOne, myShip, [3,2]);
    const testGrid = [
        [myShip,myShip,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,myShip,0,0,0,0,0,0],
        [0,0,0,myShip,0,0,0,0,0,0],
        [0,0,0,myShip,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ]
    expect(myGameboard.grid).toStrictEqual(testGrid);
})

test('Receive Attack', () => {
    const testGrid = [
        [1,1,0,0,0,0,0,0,0,0],
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
    myGameboard.receiveAttack([0,0]);
    expect(myGameboard.grid).toStrictEqual(testGridAttack);
})