let block = [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '1', '1', '1', '', '', ''],
    ['', '', '1', '', '', '', '1', '', ''],
    ['', '1', '', '', '', '', '', '1', ''],
    ['', '1', '', '', '', '', '', '', '1'],
    ['1', '', '', '', '', '', '', '', '1'],
    ['1', '', '', '', '', '', '', '', '1'],
    ['1', '', '', '', '', '', '', '', '1'],
    ['', '1', '1', '1', '1', '1', '1', '1', '']
];
const gameGrid = document.querySelector('.js-game-grid');

let selectedX = 0;
let selectedY = 0;

updateList();

function updateList() {
    gameGrid.innerHTML = '';
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            let selected = block[y][x];
            if (selected == 'o')
                gameGrid.innerHTML += `<div class="openedBlock" style="background-color:red;">
                                       </div>`;
            else if (selected == '1')
                gameGrid.innerHTML += `<div class="block" style="background-color:yellow;"onclick="
                checkBlock(${x}, ${y});">
           </div>`;
            else
                gameGrid.innerHTML += `<div class="block" style="background-color:blue;"onclick="
                                            checkBlock(${x}, ${y});">
                                       </div>`;
        }
    }
    console.log(block);
}

function checkPositions(xValue, yValue) {
    console.log(xValue, yValue);

    if (block[yValue + 1][xValue] == '')
        block[yValue + 1][xValue] = 'o';
    if (block[yValue - 1][xValue] == '')
        block[yValue - 1][xValue] = 'o';
    if (block[yValue][xValue + 1] == '')
        block[yValue][xValue + 1] = 'o';
    if (block[yValue][xValue - 1] == '')
        block[yValue][xValue - 1] = 'o';
}


function replaceBlocksAround(xValue, yValue) {
    let checkRight = false,
        checkTop = false;

    let rightCounter = 0;

    let findCenter = [];

    let lastLeft = [];

    rightCounter = Number(rightCounter);
    while (true) {
        //checkPositions(xValue, yValue);

        if (block[yValue][xValue - 1] == '1')
            lastLeft.push(xValue - 1);

        if (checkRight) {
            rightCounter += 1;
        }
        if (block[yValue][xValue + 1] == '1' && !checkRight) {
            checkRight = true;

            findCenter.push(rightCounter);
            rightCounter = 0;
            console.log(yValue, xValue + 1, ' finished right');
        }
        if (block[yValue][xValue - 1] == '1' && checkRight) {

            checkRight = false;
            if (block[yValue + 1][xValue] == '1' && !checkTop) {
                checkTop = true;
            }
            if (block[yValue + 1][xValue] != '1' && !checkTop)
                yValue++;
            else if (block[yValue - 1][xValue] != '1' && checkTop)
                yValue--;
            else if (checkTop && block[yValue - 1][xValue] == '1')
                break;
        }
        if (!checkRight) {
            xValue++;
        } else {
            xValue--;
        }
    }
    if (findCenter[0] == 0)
        findCenter.splice(0, 1);

    let findHighest = 0;
    let highestLeft = 0;

    findCenter.forEach(value => {
        findHighest = value;
        findCenter.forEach((check, index) => {
            if (check > value) {
                findHighest = check;
                highestLeft = lastLeft[index];
            }
        });
    });
    findHighest = ((findHighest / 2) + highestLeft) + 1;

    xValue = findHighest;
    yValue = selectedY;
    checkRight = false;

    while (block[yValue - 1][xValue] != '1') {
        yValue--;
    }
    while (true) {
        checkPositions(xValue, yValue);
        if (block[yValue][xValue + 1] == '1' && !checkRight)
            checkRight = true;

        if (block[yValue][xValue - 1] == '1' && checkRight) {
            checkRight = false;

            if (block[yValue + 1][xValue] != '1') {
                xValue = findHighest;
                yValue++;
            } else if (block[yValue + 1][xValue] == '1')
                break;
        }
        if (!checkRight) {
            xValue++;
        } else {
            xValue--;
        }
    }
    /*
    while (true) {
        checkPositions(xValue, yValue);

        if (block[yValue][xValue + 1] == '1' && !checkRight) {
            checkRight = true;

            console.log(yValue, xValue + 1, ' finished right');
        }
        if (block[yValue][xValue - 1] == '1' && checkRight) {
            checkRight = false;
            console.log(xValue, yValue, ' finished');
            break;
        }
        if (!checkRight) {
            xValue++;

            tempY = yValue;

            while (true) {
                checkPositions(xValue, yValue);

                if (block[yValue + 1][xValue] == '1')
                    checkTop = true;

                if (block[yValue - 1][xValue] == '1' && checkTop) {
                    checkTop = false;
                    break;
                }
                if (!checkTop) {
                    yValue++;

                } else {
                    yValue--;
                }
            }

            yValue = tempY;
        } else {
            console.log('checked right');
            xValue--;


            tempY = yValue;

            while (true) {
                checkPositions(xValue, yValue);

                if (block[yValue + 1][xValue] == '1')
                    checkTop = true;

                if (block[yValue - 1][xValue] == '1' && checkTop) {
                    checkTop = false;
                    break;
                }
                if (!checkTop) {
                    yValue++;

                } else {
                    yValue--;
                }
            }

            yValue = tempY;
        }
    }
    console.log('finished');
    */

    // x

    /*
    while (block[yValue][xValue + 1] == '') {
        xValue++;
        block[yValue][xValue] = 'o';
    }*/

    /*
    while (block[yValue + 1][xValue] == '') {
        xValue = tempX;
        yValue++;
        block[yValue][xValue] = 'o';
        while (block[yValue][xValue + 1] == '') {
            xValue++;
            block[yValue][xValue] = 'o';
        }
    }*/

    // \x

    /*// +1 x, +1 y block set
    for (let y = yValue - 1; y < yValue + 2; y++) {
        for (let x = xValue - 1; x < xValue + 2; x++) {
            if (xValue == x && yValue == y)
                continue;
            if (y != -1 && y != 9) {
                if (block[y][x] == '') {
                    block[y][x] = 'o';
                }
            }
        }
    }*/

}

function checkBlock(xValue, yValue) {
    let selectedBlock = block[yValue][xValue];

    selectedX = xValue;
    selectedY = yValue;

    if (selectedBlock == '') {
        block[yValue][xValue] = 'o';

        let tempX = xValue,
            tempY = yValue;
        replaceBlocksAround(xValue, yValue);
        /*
        while (block[yValue][xValue + 1] == '') {
            replaceBlocksAround(xValue, yValue);
            if (xValue == 7)
                break;
            xValue++;
        }
        xValue = tempX - 1;
        while (block[yValue][xValue - 1] == '') {
            if (xValue == 0)
                break;
            console.log(xValue);
            replaceBlocksAround(xValue, yValue);
            xValue--;
        }
        xValue = tempX;
        yValue = tempY;
        while (block[yValue + 1][xValue] == '') {
            console.log(yValue);
            replaceBlocksAround(xValue, yValue);
            if (yValue == 7)
                break;
            yValue++;
        }*/
    }
    updateList();
}