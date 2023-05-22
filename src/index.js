const playerGrid = document.getElementById('playerGrid');
const playerName = document.getElementById('playerName');
const vsP = document.getElementById('vsP');
const computerGrid = document.getElementById('computerGrid');
const computerGridContainer = document.getElementById('computerGridContainer');
const startBtn = document.getElementById('startBtn');
const orientationBtn = document.getElementById('orientationBtn');
const victoryCover = document.getElementById('victoryCover');
const victoryMsg = document.getElementById('victoryMsg');
const restartBtn = document.getElementById('restartBtn');
const placeShipHeader = document.getElementById('placeShipHeader');
const shipCounter = document.getElementById('shipCounter');
const btnContainer = document.getElementById('btnContainer');
const nameBox = document.getElementById('nameBox');
const backgroundMusic = document.getElementById('backgroundMusic');
const cannonAudio = document.getElementById('cannonAudio');
const musicContainer = document.getElementById('musicContainer');
const musicMute = document.getElementById('musicMute');
const playerBoard = new Gameboard(playerGrid, false);
const playerOne = new Player(playerBoard);
const computerBoard = new Gameboard(computerGrid, true);
const computer = new Player(computerBoard);


let gameOver = false;
let musicTimeout;
let isMuted = true;
let cannonAudioSrc = '../assets/cannon.mp3';

computerBoard.randomlyPlaceShips();
//adjust audio and play bg music
backgroundMusic.pause();
cannonAudio.volume = .4;
computerBoard.audioSrc = '';

// computer.randomAttack(playerBoard)

function victory(pOne, computer) {
    if (pOne.gameOver || computer.gameOver) {
        victoryCover.style.visibility = 'visible';
        victoryMsg.style.visibility = 'visible';
        restartBtn.style.visibility = 'visible';
        //computerBoard.showShips();
        //computerBoard.update();
    }

    if (pOne.gameOver) {
        victoryMsg.textContent = "Computer Wins!";
    } else if (computer.gameOver) {
        victoryMsg.textContent = 'Player Wins!';
    }
}

restartBtn.addEventListener('click', function() {
    location.reload();
})

function computerGridListeners() {
    for (let y = 0; y < playerBoard.boardSize; y++) {
        for (let x = 0; x < playerBoard.boardSize; x++) {
            const tile = computerGrid.children[y].children[x];
            tile.addEventListener('click', function() {
                let playerCheck = computerBoard.isTurn;
                if (!playerCheck) {
                    computer.randomAttack(playerBoard);
                }
                computerBoard.update();
                victory(playerBoard, computerBoard);
            })
            tile.addEventListener('mouseenter', () => {
                if (!computerBoard.board[y][x].isShip ||
                    !computerBoard.board[y][x].isHit) {
                        tile.style.backgroundColor = 'var(--hover)';
                    }
                computerBoard.update();
            })
            tile.addEventListener('mouseleave', () => {
                if (!computerBoard.board[y][x].isShip ||
                    !computerBoard.board[y][x].isHit) {
                        tile.style.backgroundColor = 'var(--default)';
                    }
                computerBoard.update();
            })
        }
    }
}


startBtn.addEventListener('click', function() {
    if (!playerBoard.placingShips && nameBox.value !== '') {
        reduceVolume();
        //playerName.style.visibility = 'visible';
        //playerName.style.position = 'relative';
        playerName.textContent = nameBox.value;
        vsP.style.visibility = 'visible';
        vsP.style.position = 'relative';
        computerGridContainer.style.visibility = 'visible';
        computerGridContainer.style.position = 'relative';
        placeShipHeader.textContent = 'FIGHT!'
        // placeShipHeader.style.visibility = 'hidden';
        // placeShipHeader.style.position = 'absolute';
        btnContainer.style.visibility = 'hidden';
        btnContainer.style.position = 'absolute';
        computerBoard.clearPlaceable();
        playerBoard.clearPlaceable();
    } else if (nameBox.value === '') {
        nameBox.style.border = '2px solid red';
    }
})


function reduceVolume() {
    backgroundMusic.volume -= 0.1;
    if (backgroundMusic.volume >= 0.2) {
        reduceVolume();
    }
}

musicContainer.addEventListener('click', function() {
    if (!isMuted) {
        musicMute.src = '../assets/music-muted.png';
        computerBoard.audioSrc = '';
        backgroundMusic.pause();
        isMuted = true;
    } else {
        musicMute.src = '../assets/music-unmuted.png';
        computerBoard.audioSrc = cannonAudioSrc;
        backgroundMusic.play();
        isMuted = false;
    }
})



computerGridListeners();