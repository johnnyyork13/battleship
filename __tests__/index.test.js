const {Ship, Gameboard} = require('../src/index');
const myShipX = new Ship(3);
const myShipY = new Ship(3);
myShipY.orientation = 'y';
const myGameboard = new Gameboard();

const testBoard = [
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

test('Check Length', () => {
    expect(myShipX.length).toBe(3);
})

test('Check Gameboard', () => {
    expect(myGameboard.board).toStrictEqual(testBoard);
})

test('Place Ship X', () => {
    myGameboard.place(myShipX, [0,0]);
    expect(myGameboard.board[0][0]).toBe(myShipX);
})

test('Whole Ship is Present X', () => {
    expect(myGameboard.board[0][2]).toBe(myShipX);
    expect(myGameboard.board[0][3]).toBe(0);
})

test('Place Ship Y', () => {
    myGameboard.place(myShipY, [1,1]);
    expect(myGameboard.board[1][1]).toBe(myShipY);
})

test('Whole Ship is Present Y', () => {
    expect(myGameboard.board[3][1]).toBe(myShipY);
    expect(myGameboard.board[4][1]).toBe(0);
})

test('Hit Ship', () => {
    myGameboard.receiveAttack([0, 0]);
    expect(myShipX.hitCount).toBe(1);
    expect(myGameboard.board[0][0]).toBe('hit');
})

test('Miss Ship', () => {
    myGameboard.receiveAttack([3, 5]);
    expect(myGameboard.board[5][3]).toBe('miss');
})

test('All Ships Sunk', () => {
    myGameboard.receiveAttack([1, 0]);
    myGameboard.receiveAttack([2, 0]);
    myGameboard.receiveAttack([1, 1]);
    myGameboard.receiveAttack([1, 2]);
    myGameboard.receiveAttack([1, 3]);
    expect(myGameboard.checkShipsSunk()).toBe(true);
})
// test('Sink Ship', () => {
//     myShipX.hit();
//     myShipX.hit();
//     expect(myShipX.isSunk).toBe(true);
// })

