const uuidText = document.querySelector('.uuidText');
const generateUuidButton = document.querySelector('.generateUuidButton');
const repetitionValue = document.querySelector('.js-rep-value');

function generateUUID(repetition) {

    let id = '';

    let idLengthList = [8, 4, 4, 4, 12]

    const character = 'abcdefghijklmnopqrstuvwxyz';
    const numCharacter = '0123456789';
    // 99974f03-49e6-4657-ad7a-d4585e612623
    // 8 - 4 - 4 - 4 - 12
    for (let rep = 0; rep < repetition; rep++) {
        for (let loopValue = 0; loopValue < idLengthList.length; loopValue++) {
            if (loopValue != 0)
                id += '-';
            for (let start = 0; start < idLengthList[loopValue]; start++) {
                let chooseCharChance = Math.floor(Math.random() * 3);
                if (chooseCharChance == 2)
                    id += character[Math.floor(Math.random() * character.length)];
                else if (chooseCharChance == 1 || chooseCharChance == 0)
                    id += numCharacter[Math.floor(Math.random() * numCharacter.length)];
            }
        }
        id += "<br>";
    }
    return id;
}

generateUuidButton.addEventListener('click', () => {
    if (repetitionValue.value == null || repetitionValue.value == '')
        repetitionValue.value = 1;
    uuidText.innerHTML = generateUUID(repetitionValue.value);
})