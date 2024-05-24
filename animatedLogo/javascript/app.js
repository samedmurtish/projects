let logoStart = false;

let transparentValue = -50,
    whiteValue = -100;

let reverseLogo = false;

const carImage = document.querySelectorAll('.image');
let img = [];

carImage.forEach((value) => {
    img.push(value);
    value.style.display = 'none';
});

window.addEventListener('click', () => {
    img[6].style.background = 'linear-gradient(to right, transparent -100%, white -100%)';
    carImage.forEach((value) => {
        value.style.display = '';
    });
    logoStart = !logoStart;
});

setInterval(() => {
    if (logoStart) {

        if (whiteValue >= 160 || whiteValue <= -110)
            reverseLogo = !reverseLogo;

        if (!reverseLogo) {
            transparentValue += 5;
            whiteValue += 15;
            img[6].style.background = 'linear-gradient(to right, transparent ' + transparentValue + '%, white ' + whiteValue + '%)';
        } else {
            transparentValue -= 5;
            whiteValue -= 15;
            img[6].style.background = 'linear-gradient(to right, transparent ' + transparentValue + '%, white ' + whiteValue + '%)';
        }
    }
}, 150);