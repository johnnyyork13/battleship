const {Ship, Gameboard, Player} = require('../src/classes');

test('If the ship can sink', () => {
    const myShip = new Ship(3);
    myShip.hit();
    myShip.hit();
    myShip.hit();
    expect(myShip.checkIfSunk()).toBe(true);
})

test('If the ship is hit', () => {
    const myShip = new Ship(2);
    myShip.hit();
    expect(myShip.hitCount).toBe(1);
})

test('If a ship can be placed', () => {
    const myShip = new Ship(2);
    const gameboard = new Gameboard();
    gameboard.placeShip(myShip, [0,0]);
    expect(gameboard.board[0][0].isShip).toBe(true);
})

test('If a hit can be logged on the gameboard', () => {
    const myShip = new Ship(2);
    const gameboard = new Gameboard();
    gameboard.placeShip(myShip, [0,0]);
    gameboard.receiveAttack([0,0]);
    expect(gameboard.board[0][0].isHit).toBe(true);
})

test('If gameboard can report if all ships have been sunk', () => {
    const myShip = new Ship(2);
    const gameboard = new Gameboard();
    gameboard.placeShip(myShip, [0,0]);
    gameboard.receiveAttack([0,0]);
    gameboard.receiveAttack([1,0]);
    expect(gameboard.checkShips()).toBe(true);
})

test('If gameboard can report if all ships have NOT been sunk', () => {
    const myShip = new Ship(2);
    const gameboard = new Gameboard();
    gameboard.placeShip(myShip, [0,0]);
    gameboard.receiveAttack([0,0]);
    expect(gameboard.checkShips()).toBe(false);
})

test('If a tile has already been played', () => {
    const ship = new Ship(2);
    const gameboard = new Gameboard();
    gameboard.placeShip([0,0]);
    gameboard.receiveAttack([0,0]);
    expect(gameboard.receiveAttack([0,0])).toBe(false);
})

test('If player class can attack directly', () => {
    const ship = new Ship(2);
    const gameboard = new Gameboard();
    const player = new Player(gameboard);
    player.gameboard.placeShip([0,0]);
    player.attack([0,0]);
    expect(player.board[0][0].isHit).toBe(true);
})