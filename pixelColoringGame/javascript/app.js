document.oncontextmenu = document.body.oncontextmenu = function() { return false; }
    /*
    var img = document.querySelector('.img');
    var docImage = document.createElement('img');
    docImage.setAttribute('src', imagePath);
    docImage.setAttribute('width', '100%')
        //docImage.style.display = 'none';
    document.body.insertBefore(docImage, img);
    console.log(docImage);*/

/* const incW = document.querySelector('.increase-w');
const decW = document.querySelector('.decrease-w');
const incH = document.querySelector('.increase-h');
const decH = document.querySelector('.decrease-h');

const whText = document.querySelector('.width-height-text');

incW.addEventListener('click', () => {
    mainContainer.style.width = (parseInt(getComputedStyle(mainContainer, '').width) + 100) + 'px';
    whText.innerHTML = mainContainer.style.width + mainContainer.style.height;
});
decW.addEventListener('click', () => {
    mainContainer.style.width = (parseInt(getComputedStyle(mainContainer, '').width) - 100) + 'px';
    whText.innerHTML = mainContainer.style.width + mainContainer.style.height;
});
incH.addEventListener('click', () => {
    mainContainer.style.height = (parseInt(getComputedStyle(mainContainer, '').height) + 100) + 'px';
    whText.innerHTML = mainContainer.style.width + mainContainer.style.height;
});
decH.addEventListener('click', () => {
    mainContainer.style.height = (parseInt(getComputedStyle(mainContainer, '').height) - 100) + 'px';
    whText.innerHTML = mainContainer.style.width + mainContainer.style.height;
}); */

const sonHali = document.querySelector('.son-hali');
sonHali.addEventListener('click', () => {
    updateDrawContainerColored();
    sonHali.remove();
});

let imagePath = document.getElementById("main-image").src;

function playAudio(url) {
    new Audio(url).play();
}
const mainContainer = document.querySelector('.main-container');
const drawContainer = document.querySelector('.draw-container');
const colorContainer = document.querySelector('.color-container');
const revealPixelsButton = document.querySelector('.reveal-pixels');

let art = {
    table: [],
    color: []
};

let userColor = {
    default: '',
    selected: '',
}

let isBlockSelected = false;


let canvasImage = { width: 0, height: 0 };

let colorList = [];

let tempColorList = [];

let testList = [];

let pixelMapList = [];

let selectedTextColor = 'black',
    defaultTextColor = 'white';

window.addEventListener('mouseup', () => {
    isBlockSelected = false;
});

/* revealPixelsButton.onmouseenter = function() {
    revealPixels();
}

revealPixelsButton.onmouseleave = function() {
    updateDrawContainer('hide');
} */

//⬛
let sortedColorList = [];

getPixelsColors();
sortColorList(sortedColorList);
getBlockColorNumber();
updateDrawContainer();

function revealPixels() {
    for (let y = 0; y < canvasImage.height + 1; y++) {
        for (let x = 0; x < canvasImage.width + 1; x++) {
            if (colorList[x * y] == sortedColorList[x * y]) {
                document.getElementById(y + '/' + x).style.backgroundColor = `rgba(${sortedColorList[x * y].r}, ${sortedColorList[x * y].g}, ${sortedColorList[x * y].b}, 255)`;

                console.log(document.getElementById(y + '/' + x));
            }
        }
    }
}

function updateTextColor(event) {
    for (let y = 0; y < canvasImage.height + 1; y++) {
        for (let x = 0; x < canvasImage.width + 1; x++) {
            if (event == 'default') {
                document.querySelector(`.block-text-${y}-${x}`).style.color = userColor.selected;
                document.querySelector(`.block-text-${y}-${x}`).style.filter = "invert(100%)";
            } else if (event == 'selectedNumber' && document.querySelector('.block-text-' + y + '-' + x).textContent == userColor.colorId) {
                document.querySelector(`.block-text-${y}-${x}`).style.color = selectedTextColor;
                document.querySelector(`.block-text-${y}-${x}`).style.borderStyle = 'dotted';
                document.querySelector(`.block-text-${y}-${x}`).style.borderColor = 'rgba(0, 0, 0, 0.4)';
                document.querySelector(`.block-text-${y}-${x}`).style.borderBottomColor = 'transparent';
                document.querySelector(`.block-text-${y}-${x}`).style.borderTopColor = 'transparent';
                document.querySelector(`.block-text-${y}-${x}`).style.filter = null;
            } else if (event == 'clear') {
                document.querySelector(`.block-text-${y}-${x}`).style.border = null;
                document.querySelector(`.block-text-${y}-${x}`).style.color = defaultTextColor;
                document.querySelector(`.block-text-${y}-${x}`).style.filter = null;
            }
        }
    }
}

function getPixelsColors() {
    var image = new Image();
    image.src = imagePath;

    var canvas = document.createElement('canvas');

    canvas.width = image.width;
    canvas.height = image.height;

    canvasImage = {
        width: Math.floor(image.width / 20),
        height: Math.floor(image.height / 20)
    };

    mainContainer.style.width = (canvasImage.width * 100) + 100 + 'px';
    mainContainer.style.height = (canvasImage.height * 100) + 100 + 'px';

    let imageSize = { width: mainContainer.style.width, height: mainContainer.style.height };

    /*     if ((image.width % 10) != 0)
            imageSize = { width: (canvasImage.width * 100) + 100, height: imageSize.height };
        if ((image.height % 10) != 0)
            imageSize = { width: imageSize.width, height: (canvasImage.height * 100) + 100 }; */

    mainContainer.style.width = imageSize.width + 'px';
    mainContainer.style.height = imageSize.height + 'px';

    var context = canvas.getContext('2d', { willReadFrequently: true });

    context.drawImage(image, 0, 0);

    for (let yAxis = 5; yAxis < image.height; yAxis += 20) {
        for (let xAxis = 0; xAxis < image.width; xAxis += 20) {
            var data = context.getImageData(xAxis, yAxis, 1, 1).data;
            colorList.push({ r: data[0], g: data[1], b: data[2], a: data[3] });
        }
    }
    colorList.values().forEach(value => {
        tempColorList.push(value);
    })
    colorList.values().forEach(value => {
        sortedColorList.push(value);
    })
}

function sortColorList(array) {
    const seenColors = {};
    const uniqueColors = [];

    for (const color of array) {
        const key = `${color.r}-${color.g}-${color.b}`;
        if (!seenColors[key]) {
            seenColors[key] = true;
            uniqueColors.push(color);
        }
    }
    array.length = 0;
    array.push(...uniqueColors);

    array.values().forEach(value => {
        art.color.push(`rgba(${value.r}, ${value.g}, ${value.b}, ${value.a}`);
    })
}

function getBlockColorNumber() {
    for (let pixelIndex = 0; pixelIndex < colorList.length; pixelIndex++) {
        for (let colorIndex = 0; colorIndex < sortedColorList.length; colorIndex++) {
            if (colorList[pixelIndex].r == sortedColorList[colorIndex].r &&
                colorList[pixelIndex].g == sortedColorList[colorIndex].g &&
                colorList[pixelIndex].b == sortedColorList[colorIndex].b) {
                pixelMapList.push({ pixelId: pixelIndex, colorId: colorIndex + 1 });
                break;
            } else {
                if (colorIndex == sortedColorList.length - 1) {
                    pixelMapList.push({ pixelId: pixelIndex, colorId: ' ' });
                }
            }
        }
    }
}

function drawBlockSchematic(blockInfo) {
    document.getElementById(blockInfo.y + '/' + blockInfo.x).style.backgroundColor = userColor.selected;
    playAudio('/projects/pixelColoringGame/sources/drawSound.mp3');
    if (document.querySelector(`.block-text-${blockInfo.y}-${blockInfo.x}`).textContent != userColor.colorId) {
        document.querySelector(`.block-text-${blockInfo.y}-${blockInfo.x}`).style.color = userColor.selected;
        document.querySelector(`.block-text-${blockInfo.y}-${blockInfo.x}`).style.filter = "invert(100%)";
    } else {
        document.querySelector(`.block-text-${blockInfo.y}-${blockInfo.x}`).style.color = selectedTextColor;
        document.querySelector(`.block-text-${blockInfo.y}-${blockInfo.x}`).style.filter = null;
    }
}

function drawBlock(goal, blockInfo, event) {
    let mouse;
    if (event != null) {
        if (event.button == 1 || event.button == 2) {
            return;
        }
        if (event.button == 0)
            mouse = true; // left click
        else if (event.button == 2)
            mouse = false; // right click
    }
    if (goal == "down") {
        isBlockSelected = true;
        drawBlockSchematic(blockInfo);
    } else if (goal == 'hover') {
        if (isBlockSelected) {
            drawBlockSchematic(blockInfo);
        }

    } else if (goal == 'up')
        isBlockSelected = false;
}

function selectColor(colorIndex) {
    isBlockSelected = false;
    userColor = {
        default: userColor.default,
        selected: art.color[colorIndex],
        colorId: colorIndex + 1
    };
    updateTextColor('clear');
    updateTextColor('selectedNumber');
    document.querySelector('.selected-color').style.backgroundColor = userColor.selected;
}

function updateDrawContainerColored() {
    drawContainer.innerHTML = '';
    let testIndex = 0;
    let blockColorId = 0;
    for (let y = 0; y < canvasImage.height + 1; y++) {
        for (let x = 0; x < canvasImage.width + 1; x++) {
            if (testIndex < tempColorList.length)
                if (testIndex == pixelMapList[testIndex].pixelId)
                    blockColorId = pixelMapList[testIndex].colorId;

            drawContainer.innerHTML += `<button class="block"  onmouseup="drawBlock('up')" onmouseover="drawBlock('hover', {x: ${x}, y: ${y}}, event)" style="background-color: rgb(${tempColorList[testIndex].r}, ${tempColorList[testIndex].g}, ${tempColorList[testIndex].b})" onmousedown="drawBlock('down', {x: ${x}, y: ${y}}, event)" id="${y}/${x}" ><p class="block-text-${y}-${x}">${blockColorId}</p></button>`;
            testIndex++; //style="background-color: rgb(${tempColorList[testIndex].r}, ${tempColorList[testIndex].g}, ${tempColorList[testIndex].b})"
        }
    }
}

function updateDrawContainer() {
    drawContainer.innerHTML = '';
    let testIndex = 0;
    let blockColorId = 0;
    for (let y = 0; y < canvasImage.height + 1; y++) {
        for (let x = 0; x < canvasImage.width + 1; x++) {
            if (testIndex < tempColorList.length)
                if (testIndex == pixelMapList[testIndex].pixelId)
                    blockColorId = pixelMapList[testIndex].colorId;

            drawContainer.innerHTML += `<button class="block"  onmouseup="drawBlock('up')" onmouseover="drawBlock('hover', {x: ${x}, y: ${y}}, event)" onmousedown="drawBlock('down', {x: ${x}, y: ${y}}, event)" id="${y}/${x}" ><p class="block-text-${y}-${x}">${blockColorId}</p></button>`;
            testIndex++; //style="background-color: rgb(${tempColorList[testIndex].r}, ${tempColorList[testIndex].g}, ${tempColorList[testIndex].b})"
        }
    }
}
for (let index = 0; index <= art.color.length; index++) {
    if (index < art.color.length) {
        colorContainer.innerHTML += `<div><button class="block color-bucket" onclick="selectColor(${index});"></button><p>${index + 1}</p></div>`;

        document.querySelectorAll('.color-bucket').forEach((element, index) => {
            element.style.backgroundColor = art.color[index];
            element.id = art.color[index];
        });
    } else
        colorContainer.innerHTML += `<button class="block" id="eraser" onclick="isBlockSelected = false; userColor = {default: userColor.default, selected: userColor.default};">🧻</button>`;
}

updateTextColor('default');

userColor = {
    default: document.getElementById('0/0').style.backgroundColor,
    selected: userColor.selected
};