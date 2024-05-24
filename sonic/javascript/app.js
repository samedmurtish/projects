const firstTreeLeft = document.querySelector(".left-first-tree");
const secondTreeLeft = document.querySelector(".left-second-tree");
const thirdTreeLeft = document.querySelector(".left-third-tree");
const fourthTreeLeft = document.querySelector(".left-fourth-tree");
const fifthTreeLeft = document.querySelector(".left-fifth-tree");
const sixthTreeLeft = document.querySelector(".left-sixth-tree");

const firstTreeRight = document.querySelector(".right-first-tree");
const secondTreeRight = document.querySelector(".right-second-tree");
const thirdTreeRight = document.querySelector(".right-third-tree");
const fourthTreeRight = document.querySelector(".right-fourth-tree");
const fifthTreeRight = document.querySelector(".right-fifth-tree");
const sixthTreeRight = document.querySelector(".right-sixth-tree");

const bg = document.querySelectorAll(".bg");

const welcomeText = document.querySelector(".ground-container");

document.body.style.overflowY = "visible";
document.body.style.overflowX = "visible";

window.scrollTo(0, 0);

window.location.replace("#first");

updateScreen();

function updateScreen() {
    value = window.scrollY;

    /*     if (value > 1000) {
                  document.body.style.overflowY = 'hidden';
                  document.body.style.overflowX = 'hidden';
              } */
    /* 
              let textPosition = 0;
              textPosition = 100 + (-value * 0.1);
              if (textPosition >= 50) {
                  welcomeText.style.top = textPosition + '%'
              } */

    /*     let sunScale = 0;
              sunScale = 1 + value / 1000;

              if (sunScale < 1.4)
                  sun.style.scale = 1 + value / 1000;
           */

    let bgScale = 0;
    bgScale = 1 + value / 1000;

    if (bgScale < 1.1) {
        bg.forEach((element) => {
            element.style.scale = 1 + value / 5000;
        });
    }

    // left
    fourthTreeLeft.style.left = -value + 500 * 0.3 + "px";
    fourthTreeLeft.style.rotate = -(value * 0.01) + "deg";
    fifthTreeLeft.style.left = (-value + 350) * 0.8 + "px";
    fifthTreeLeft.style.rotate = -(value * 0.02) + "deg";
    sixthTreeLeft.style.left = (-value + 500) * 0.8 + "px";
    sixthTreeLeft.style.rotate = -(value * 0.03) + "deg";

    fourthTreeLeft.style.scale = 1 + value / 1000;
    fifthTreeLeft.style.scale = 1 + value / 1000;
    sixthTreeLeft.style.scale = 1 + value / 1000;

    firstTreeLeft.style.left = -value + 150 * 0.3 + "px";
    firstTreeLeft.style.rotate = -(value * 0.01) + "deg";
    secondTreeLeft.style.left = (-value - 80) * 0.8 + "px";
    secondTreeLeft.style.rotate = -(value * 0.02) + "deg";
    thirdTreeLeft.style.left = (-value - 150) * 0.8 + "px";
    thirdTreeLeft.style.rotate = -(value * 0.03) + "deg";

    firstTreeLeft.style.scale = 1 + value / 1000;
    secondTreeLeft.style.scale = 1 + value / 1000;
    thirdTreeLeft.style.scale = 1 + value / 1000;

    // right
    firstTreeRight.style.right = -value - 50 * 0.8 + "px";
    firstTreeRight.style.rotate = value * 0.01 + "deg";
    secondTreeRight.style.right = (-value - -20) * 0.8 + "px";
    secondTreeRight.style.rotate = value * 0.02 + "deg";
    thirdTreeRight.style.right = -value + 180 * 0.8 + "px";
    thirdTreeRight.style.rotate = value * 0.03 + "deg";

    firstTreeRight.style.scale = 1 + value / 1000;
    secondTreeRight.style.scale = 1 + value / 1000;
    thirdTreeRight.style.scale = 1 + value / 1000;

    fourthTreeRight.style.right = -value + 700 * 0.8 + "px";
    fourthTreeRight.style.rotate = value * 0.01 + "deg";
    fifthTreeRight.style.right = (-value + 350) * 0.8 + "px";
    fifthTreeRight.style.rotate = value * 0.02 + "deg";
    sixthTreeRight.style.right = -value + 250 + 180 * 0.8 + "px";
    sixthTreeRight.style.rotate = value * 0.03 + "deg";

    fourthTreeLeft.style.scale = 1 + value / 1000;
    fifthTreeLeft.style.scale = 1 + value / 1000;
    sixthTreeLeft.style.scale = 1 + value / 1000;
}
window.addEventListener("scroll", () => {
    updateScreen();
});