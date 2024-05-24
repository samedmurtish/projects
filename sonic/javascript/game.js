const canvas = document.getElementById("canvas");

const player = document.querySelector(".player");

let groundList = [];

let playerSpeed = 30;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

var characterImage = new Image();
characterImage.src = "/sonic/sources/sonic.png";

const backgroundImage = new Image();
backgroundImage.src = "/sonic/sources/bg.jpg";

const sunImage = new Image();
sunImage.src = "/sonic/sources/sun.gif";

const ground = new Image();
ground.src = "/sonic/sources/ground.png";

const doorC = new Image();
doorC.src = "/sonic/sources/door-closed.png";

const doorO = new Image();
doorO.src = "/sonic/sources/door-opened.png";

const ctx = canvas.getContext("2d");

let x = 300;
let y = canvas.height - characterImage.height;

let dy = 0;
let dx = 0;
const gravity = 0.5;
const jumpForce = -15;
let isJumping = false;
let isFacingRight = true;

let inDoors = false;

let doorClosed = [true, true];

let sheIsIn = false;

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

function handleKeyDown(event) {
    if (event.key === " " || event.key == "w" || event.key == "W") {
        if (!isJumping) {
            dy = jumpForce;
            isJumping = true;
        }
    }
    if (event.key === "ArrowLeft" || event.key == "a") {
        dx = -3;
        isFacingRight = false;
    }
    if (event.key === "ArrowRight" || event.key == "d") {
        dx = 3;
        isFacingRight = true;
    }
    if (event.key === "e" || event.key === "E") {
        if (x > 700 + 450 && x < 800 + 450) {
            doorClosed[0] = !doorClosed[0];
            console.log(doorClosed);
        }
    }
    if (event.key === "Enter") {
        if (x > 700 + 450 && x < 800 + 450 && !doorClosed[0]) {
            sheIsIn = false;
            window.close();
        }
        if (x > 800 + 300 && x < 900 + 300 && !doorClosed[1]) {
            sheIsIn = true;
            // what to do when going inside
        }
    }
}

function handleKeyUp(event) {
    if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "a" ||
        event.key === "d"
    ) {
        if (event.key === "ArrowLeft" || (event.key === "a" && isFacingRight))
            return;
        else if (
            event.key === "ArrowRight" ||
            (event.key === "d" && !isFacingRight)
        )
            return;
        dx = 0;
    }
}

let groundHeight = 200;

let groundFinalHeight = canvas.height - groundHeight;

function update() {
    dy += gravity;
    y += dy;

    if (x >= 250) {
        if (x <= 1500 && isFacingRight) x += dx;
        else if (!isFacingRight) x += dx;
    } else if (isFacingRight) x += dx;
    if (y >= canvas.height - characterImage.height) {
        y = canvas.height - characterImage.height;
        dy = 0;
        isJumping = false;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(backgroundImage, -x - 0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        backgroundImage, -x + canvas.width + 0,
        0,
        canvas.width,
        canvas.height
    );
    //ctx.drawImage(sunImage, -x + 500, 100, sunImage.width / 5, sunImage.height / 5);

    if (doorClosed[0])
        ctx.drawImage(
            doorC, -x + 1500 + 900,
            groundFinalHeight - 150,
            doorC.width * 2,
            doorC.height * 2
        );
    else
        ctx.drawImage(
            doorO, -x + 1500 + 900,
            groundFinalHeight - 150,
            doorC.width * 2,
            doorC.height * 2
        );

    if (doorClosed[1])
        ctx.drawImage(
            doorC, -x + 1700 + 1000,
            groundFinalHeight - 150,
            doorC.width * 2,
            doorC.height * 2
        );
    else
        ctx.drawImage(
            doorO, -x + 1700 + 1000,
            groundFinalHeight - 150,
            doorC.width * 2,
            doorC.height * 2
        );

    for (let index = -1; index < 15; index++) {
        ctx.drawImage(
            ground, -x + index * 230,
            groundFinalHeight,
            ground.width / 2,
            ground.height / 3
        );
    }

    let text5 = "DOĞUM GÜNÜN KUTLU OLSUUUUUUUN";
    ctx.font = "bold 40px verdana, sans-serif";
    ctx.fillText(text5, -x + 900, groundFinalHeight - 290);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";

    if (x > 700 + 400 && x < 1000 + 400) {
        let text = "sec knk";
        ctx.font = "bold 20px verdana, sans-serif";
        ctx.fillText(text, x + 50, y - 300);
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
    }

    let text1 = "EVET";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "bold 20px verdana, sans-serif";
    ctx.fillText(text1, -x + 1550 + 900, groundFinalHeight - 200);

    let text2 = "HAYIR";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "bold 20px verdana, sans-serif";
    ctx.fillText(text2, -x + 1750 + 1000, groundFinalHeight - 200);

    let text3 = "BENIMLE SEVGİLİ OLMAYA NE DERSİN, GÜZELLİK ?";
    ctx.font = "bold 30px verdana, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(text3, -x + 1650 + 950, groundFinalHeight - 250);

    ctx.font = "bold 30px verdana, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.strokeText(text3, -x + 1650 + 950, groundFinalHeight - 250);

    if (isFacingRight) {
        ctx.drawImage(
            characterImage,
            x,
            y - 270,
            characterImage.width * 3,
            characterImage.height * 3
        );
    } else {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(
            characterImage, -x - characterImage.width,
            y - 270,
            characterImage.width * 3,
            characterImage.height * 3
        );
        ctx.restore();
    }

    requestAnimationFrame(update);
}

ground.onload = () => {
    update();

    function playAudio(url) {
        new Audio(url).play();
    }
    playAudio("/sonic/sources/dgko.mp3");
};