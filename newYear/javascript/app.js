const firstTree = document.querySelector('.first-tree');
const secondTree = document.querySelector('.second-tree');
const thirdTree = document.querySelector('.third-tree');

const fourthTree = document.querySelector('.fourth-tree');
const fifthTree = document.querySelector('.fifth-tree');
const sixthTree = document.querySelector('.sixth-tree');

const moon = document.querySelector('.moon');

const bg = document.querySelectorAll('.bg');

const welcomeText = document.querySelector('.welcomeText');

document.body.style.overflowY = 'visible';
document.body.style.overflowX = 'visible';

welcomeText.style.top = 100 + '%';

updateScreen();

function updateScreen() {
    value = window.scrollY;

    let textPosition = 0;
    textPosition = 100 + (-value * 0.1);
    if (textPosition >= 50) {
        welcomeText.style.top = textPosition + '%'
    }

    let moonScale = 0;
    moonScale = 1 + value / 1000;

    if (moonScale < 1.4)
        moon.style.scale = 1 + value / 1000;

    let bgScale = 0;
    bgScale = 1 + value / 1000;

    if (bgScale < 1.1) {
        bg.forEach(element => {
            element.style.scale = 1 + value / 5000;
        });
    }



    firstTree.style.left = -value + 150 * 0.3 + 'px';
    firstTree.style.rotate = -(value * 0.01) + 'deg';
    secondTree.style.left = ((-value - 80) * 0.8 + 'px');
    secondTree.style.rotate = -(value * 0.02) + 'deg';
    thirdTree.style.left = ((-value - 150) * 0.8 + 'px');
    thirdTree.style.rotate = -(value * 0.03) + 'deg';

    fourthTree.style.right = -value - 150 * 0.8 + 'px';
    fourthTree.style.rotate = (value * 0.01) + 'deg';
    fifthTree.style.right = ((-value - 80) * 0.8 + 'px');
    fifthTree.style.rotate = (value * 0.02) + 'deg';
    sixthTree.style.right = ((-value - 100) + 180 * 0.8 + 'px');
    sixthTree.style.rotate = (value * 0.03) + 'deg';

    firstTree.style.scale = 1 + value / 1000;
    secondTree.style.scale = 1 + value / 1000;
    thirdTree.style.scale = 1 + value / 1000;
    fourthTree.style.scale = 1 + value / 1000;
    fifthTree.style.scale = 1 + value / 1000;
    sixthTree.style.scale = 1 + value / 1000;
}
window.addEventListener('scroll', () => {
    updateScreen();
});