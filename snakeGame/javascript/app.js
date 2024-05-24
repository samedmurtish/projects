const gameContainer = document.querySelector('.game-container');

const gameInfo = document.querySelector('.game-info');

const gamePausePanel = document.querySelector('.game-paused');
const gamePausePanelText = document.querySelector('.game-paused-text');

const loseTextTemplate = 'You Lost !<br>Press any key to start over.',
    winTextTemplate = 'You Won !<br>Press any key to start over.';

let screenLoaded = false;

let isGameFinished = false;

let snakeSpeed = 180;

let snakeDirection = '';

let snakePosition = {
    x: 4,
    y: 4
};

let snakeBody = [];

let foodPosition = {
    x: 0,
    y: 0
};
let snakeLength = 0,
    snakeLengthCounter = 0;

let checkIllegalTurn = false;

let gameGrid = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
];

for (let index = 0; index < snakeLength; index++) {
    snakeBody.push({
        x: snakePosition.x,
        y: snakePosition.y
    });

}
foodGenerator();
updateScreen();

window.addEventListener('keydown', () => {
    if (!checkIllegalTurn && !isGameFinished) {
        switch (event.key) {
            case 'w':
                if (snakeDirection != 'down') {
                    snakeDirection = 'up';
                    checkIllegalTurn = true;
                }
                break;
            case 'ArrowUp':
                if (snakeDirection != 'down') {
                    snakeDirection = 'up';
                    checkIllegalTurn = true;
                }
                break;
            case 'a':
                if (snakeDirection != 'right') {
                    snakeDirection = 'left';
                    checkIllegalTurn = true;
                }
                break;
            case 'ArrowLeft':
                if (snakeDirection != 'right') {
                    snakeDirection = 'left';
                    checkIllegalTurn = true;
                }
                break;
            case 's':
                if (snakeDirection != 'up') {
                    snakeDirection = 'down';
                    checkIllegalTurn = true;
                }
                break;
            case 'ArrowDown':
                if (snakeDirection != 'up') {
                    snakeDirection = 'down';
                    checkIllegalTurn = true;
                }
                break;
            case 'd':
                if (snakeDirection != 'left') {
                    snakeDirection = 'right';
                    checkIllegalTurn = true;
                }
                break;
            case 'ArrowRight':
                if (snakeDirection != 'left') {
                    snakeDirection = 'right';
                    checkIllegalTurn = true;
                }
                break;
            default:
                snakeDirection = '';
                break;
        }
    }
    if (isGameFinished) {
        snakePosition.x = 4;
        snakePosition.y = 4;
        snakeDirection = '';
        snakeLength = 0;
        snakeLengthCounter = 0;
        checkIllegalTurn = false;
        isGameFinished = false;
        snakeSpeed = 180;
        updateGrid();
        updateScreen();
        gamePausePanel.classList.add('hide');
    }
});

function updateGrid() {
    gameGrid = [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ];
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (snakePosition.x == x && snakePosition.y == y)
                gameGrid[y][x] = 'p';
            else if (foodPosition.x == x && foodPosition.y == y)
                gameGrid[y][x] = 'f';
            else if (snakeLength > 0) {
                for (let snakeIndex = 0; snakeIndex < snakeLength; snakeIndex++) {
                    if (snakeBody[snakeIndex].x == x && snakeBody[snakeIndex].y == y) {
                        gameGrid[y][x] = 'b';
                    }
                }
            }
        }

    }
}

setInterval(() => {
    if (snakeDirection != '') {
        checkIllegalTurn = false;
        for (let snakeIndex = snakeLength - 1; snakeIndex > 0; snakeIndex--) {
            snakeBody[snakeIndex].x = snakeBody[snakeIndex - 1].x;
            snakeBody[snakeIndex].y = snakeBody[snakeIndex - 1].y;
        }
        if (snakeLength > 0) {
            snakeBody[0].x = snakePosition.x;
            snakeBody[0].y = snakePosition.y;
        }

        switch (snakeDirection) {
            case 'up':
                if ((snakePosition.y - 1) == -1)
                    snakePosition.y = 9;
                snakePosition.y--;
                break;
            case 'down':
                if (snakePosition.y == 8)
                    snakePosition.y = -1;
                snakePosition.y++;
                break;
            case 'left':
                if ((snakePosition.x - 1) == -1)
                    snakePosition.x = 9;
                snakePosition.x--;
                break;
            case 'right':
                if (snakePosition.x == 8)
                    snakePosition.x = -1;
                snakePosition.x++;
                break;
        };

        updateGrid();
        updateScreen();
    }
}, snakeSpeed);

function foodGenerator() {
    foodPosition = {
        x: Math.floor(Math.random() * 9),
        y: Math.floor(Math.random() * 9)
    }
    for (let snakeIndex = 0; snakeIndex < snakeLength; snakeIndex++) {
        if (snakeBody[snakeIndex].x == foodPosition.x && snakeBody[snakeIndex].y == foodPosition.y || snakePosition.x == foodPosition.x && snakePosition.y == foodPosition.y)
            foodGenerator();
    }
}

function finishGame(text) {

    isGameFinished = true;
    snakeDirection = '';
    gamePausePanel.classList.remove('hide');
    gamePausePanelText.innerHTML = loseTextTemplate;
}

function updateScreen() {
    gameContainer.innerHTML = '';
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (snakePosition.x == x && snakePosition.y == y) {
                for (let snakeIndex = 0; snakeIndex < snakeLength; snakeIndex++) {
                    if (snakeBody[snakeIndex].x == snakePosition.x && snakeBody[snakeIndex].y == snakePosition.y && snakeDirection != '') {
                        finishGame(loseTextTemplate);
                    }
                }
                if (foodPosition.x == x && foodPosition.y == y) {
                    snakeLength++;
                    if (snakeLength == 81) {
                        finishGame(winTextTemplate);
                        break;
                    }
                    snakeLengthCounter++;
                    if (snakeLengthCounter == 5) {
                        if (snakeSpeed != 0) {
                            snakeLengthCounter = 0;
                            snakeSpeed -= 10;
                        }
                    }
                    gameGrid[y][x] = ' ';
                    snakeBody.push({
                        x: snakePosition.x,
                        y: snakePosition.y
                    });
                    foodGenerator();
                }
                gameContainer.innerHTML += `<div class="game-square square-text snake js-snake"></div>`;
                if (snakeDirection != '') {
                    let snake = document.querySelector('.js-snake');

                    if (snakeDirection == 'up')
                        snake.style.rotate += 180 + 'deg';
                    else if (snakeDirection == 'down')
                        snake.style.rotate += 0 + 'deg';
                    else if (snakeDirection == 'left')
                        snake.style.rotate += 90 + 'deg';
                    else if (snakeDirection == 'right')
                        snake.style.rotate += 270 + 'deg';
                }
            } else if (gameGrid[y][x] == ' ') {
                gameContainer.innerHTML += `<div class="game-square square-text">${gameGrid[y][x]}</div>`;
            } else if (gameGrid[y][x] == 'f') {
                gameContainer.innerHTML += `<div class="game-square square-text"><img width="65%" src="/projects/snakeGame/sources/apple.png"></div></div>`;
            } else if (gameGrid[y][x] == 'b') {
                gameContainer.innerHTML += `<div class="game-square square-text snakeBody"></div>`;
            }
        }
    }
    gameInfo.innerHTML = 'length: ' + `<span style="color: #7af07a
    ">` + snakeLength;
}