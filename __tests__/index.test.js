const {Ship} = require('../src/index');
const myShip = new Ship(3);

test('Check Length', () => {
    expect(myShip.length).toBe(3);
})
test('Hit Ship', () => {
    myShip.hit();
    expect(myShip.hitCount).toBe(1);
})
test('Sink Ship', () => {
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk).toBe(true);
})