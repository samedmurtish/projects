const input = document.querySelector('.passwordInput');

const infoContainer = document.querySelector('.info-container');

const character = 'abcdefghijklmnopqrstuvwxyz';
const numCharacter = '0123456789';
const symCharacter = '!@#$%^&*()_+-='

const conditionTextSchematic = [
    " At least 8 characters length",
    " At least 1 number (0...9)",
    " At least 1 lowercase letter (a...z)",
    " At least 1 uppercase letter (A...Z)",
    " At least 1 special symbol (!...$)"
]

let checkCondition = {
    length: false,
    number: false,
    lowercase: false,
    uppercase: false,
    symbol: false
};

let conditionList = ['○', '○', '○', '○', '○'];

updateInfoList();

function updateInfoList() {
    infoContainer.innerHTML = '';
    conditionTextSchematic.forEach((value, index) => {
        infoContainer.innerHTML += `
                <span class="info-container-text">
                <span class="length-tick js-length-tick">${conditionList[index]}</span>    
                <span >${value}</span> 
            </span>`
    })
}

let passwordLength = 0;
input.addEventListener('keydown', () => {
    passwordLength = input.value.length;
    let password = input.value;
    for (let a = 0; a < character.length; a++) {
        if (event.key != character[a] &&
            event.key != numCharacter[a] &&
            event.key != symCharacter[a]) {
            passwordLength--;
            break;
        }


    }
    console.log(passwordLength);
    // check length
    if (passwordLength >= 8)
        conditionList[0] = '•'
    else
        conditionList[0] = '○'
        // check for number

    for (let a = 0; a < password.length; a++)
        for (let b = 0; b < numCharacter.length; b++)
            if (password[a] == numCharacter[b])
                conditionList[1] = '•';
            else
                conditionList[1] = '○';
    updateInfoList();
});


/*
    let password = input.value;
    for (let a = 0; a < character.length; a++) {
        if (event.key == character[a] ||
            event.key == numCharacter[a] ||
            event.key == symCharacter[a])
            passwordLength++;
        else if (event.key == 'Backspace' && passwordLength > 0) {
            passwordLength--;
            break;
        }
    }
    console.log(passwordLength);
    // check length
    if (passwordLength >= 8)
        conditionList[0] = '•'
    else
        conditionList[0] = '○'
        // check for number

    for (let a = 0; a < password.length; a++)
        for (let b = 0; b < numCharacter.length; b++)
            if (password[a] == numCharacter[b])
                conditionList[1] = '•';
            else
                conditionList[1] = '○';
    updateInfoList();*/