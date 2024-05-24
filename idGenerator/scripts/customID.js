let idLabel = document.querySelector('.idText');

let errorLabel = document.querySelector('.js-error-label');
let useLetterInput = document.querySelector('.useLetter');
let useUpperCase = document.querySelector('.useUpperCase');
let useLowerCase = document.querySelector('.useLowerCase');
let useMixedCase = document.querySelector('.useMixedCase');
let useUpperCaseDiv = document.querySelector('.useUpperCaseDiv');
let useLowerCaseDiv = document.querySelector('.useLowerCaseDiv');
let useMixedCaseDiv = document.querySelector('.useMixedCaseDiv');
let generateButton = document.querySelector('.generateButton');
let idDivisionNum = document.querySelector('.idDivisionInput');
let partLength = document.querySelector('.partLength');

function checkCheckbox(name) {
    switch (name) {
        case 'upperCase':
            useMixedCase.checked = false;
            useLowerCase.checked = false;
            break;
        case 'lowerCase':
            useUpperCase.checked = false;
            useMixedCase.checked = false;
            break;
        case 'mixedCase':
            useUpperCase.checked = false;
            useLowerCase.checked = false;
            break;
        case 'useLetters':
            if (useLetterInput.checked) {
                useMixedCaseDiv.classList.remove('hide');
                useLowerCaseDiv.classList.remove('hide');
                useUpperCaseDiv.classList.remove('hide');

                useUpperCase.addEventListener('click', () => {
                    checkCheckbox('upperCase');
                })
                useLowerCase.addEventListener('click', () => {
                    checkCheckbox('lowerCase');
                })
                useMixedCase.addEventListener('click', () => {
                    checkCheckbox('mixedCase');
                })
            } else {

                useUpperCaseDiv.classList.add('hide');
                useLowerCaseDiv.classList.add('hide');
                useMixedCaseDiv.classList.add('hide');

            }
            break;
    }
}

function generate(repetition, useLetter, upperCase, mixedCase) {
    let id = '';

    const character = 'abcdefghijklmnopqrstuvwxyz';
    const numCharacter = '0123456789';

    for (let rep = 0; rep < repetition; rep++) {
        let idLength = Math.floor(Math.random() * 10);
        if (partLength.value != '')
            idLength = partLength.value;
        else {
            if (idLength <= 2)
                idLength += 3;
        }
        if (rep != 0)
            id += '<span style="color: darkgray">-</style><span style="color: white"></style>';
        for (let index = 0; index < idLength; index++) {

            let letterChance = Math.floor(Math.random() * 2);

            if (useLetter) {
                if (letterChance == 0) {
                    let chosenCharacter = character[Math.floor(Math.random() * character.length)];

                    if (upperCase)
                        chosenCharacter = chosenCharacter.toUpperCase();

                    if (mixedCase) {
                        let chooseCase = Math.floor(Math.random() * 2)
                        switch (chooseCase) {
                            case 0:
                                chosenCharacter = chosenCharacter.toUpperCase();
                                break;
                            case 1:
                                chosenCharacter = chosenCharacter.toLowerCase();
                                break;
                        }
                    }
                    id += chosenCharacter;
                } else
                    id += numCharacter[Math.floor(Math.random() * numCharacter.length)];

            } else {
                if (letterChance == 0 || letterChance == 1) {

                    id += numCharacter[Math.floor(Math.random() * numCharacter.length)];
                }
            }
        }
    }
    return id;
}

function run() {
    if (page.customID) {
        console.log('here');

        errorLabel.classList.add('hide');

        useUpperCaseDiv.classList.add('hide');
        useLowerCaseDiv.classList.add('hide');
        useMixedCaseDiv.classList.add('hide');

        idLabel.innerHTML = generate(3, useLetterInput.checked, false, false);


        useLetterInput.addEventListener('click', () => {
            checkCheckbox('useLetters');
        })

        generateButton.addEventListener('click', () => {
            if (idDivisionNum.value > 25) {
                idDivisionNum.value = '';
                errorLabel.classList.remove('hide');
            } else
                errorLabel.classList.add('hide');
            if (idDivisionNum.value == '')
                idDivisionNum.value = 3;

            idLabel.innerHTML = generate(idDivisionNum.value, useLetterInput.checked, useUpperCase.checked, useMixedCase.checked);
            /*  
                generate elements =
    
                number of id's,
                use letter boolean,
                use upper case letters,
                use mixed both upper and lower case letters. 
            */
        });


    }
}