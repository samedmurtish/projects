let canUseTotal = true;
let canUseOperator = true;
let finalText = '';

let total = '';

let firstNumber = 0,
    secondNumber = 0;

let operationType = false;

let operation = '';

let lastOperation = localStorage.getItem("lastOperation");

if (localStorage.getItem("lastOperation") != null)
    document.getElementById("totalText").innerHTML = "your last operation was with '" + lastOperation + "' what's next, boss?";
else
    document.getElementById("totalText").innerHTML = '';

function updateTotal() {
    if (!operationType) {
        document.getElementById("totalText").innerHTML = total;

    } else
        document.getElementById("totalText").innerHTML = firstNumber + ' ' + operation + ' ' + total;
}

function backspace() {
    total = total.substring(total.length - 1, 0);
    updateTotal();
}

function number(index) {
    total += index;
    document.getElementById("totalText").innerHTML = '';
    updateTotal();
    canUseOperator = true;
    canUseTotal = true;
}

function operator(index) {
    if (canUseOperator) {
        document.getElementById("totalText").innerHTML = document.getElementById("totalText").innerHTML + ' ' + index;
        operation = index;
        if (firstNumber == 0) {
            operationType = true;
            firstNumber = total;
            parseInt(firstNumber);
        }
        total = '';
        canUseTotal = true;
    }
}

function totalSum() {
    if (canUseTotal) {
        secondNumber = total;
        parseInt(secondNumber)
        if (operation == '-')
            finalText = firstNumber + ' - ' + secondNumber + ' = ' + (parseInt(firstNumber) - parseInt(secondNumber));
        if (operation == '/')
            finalText = firstNumber + ' / ' + secondNumber + ' = ' + (parseInt(firstNumber) / parseInt(secondNumber));
        if (operation == 'x')
            finalText = firstNumber + ' x ' + secondNumber + ' = ' + (parseInt(firstNumber) * parseInt(secondNumber));
        if (operation == '+')
            finalText = firstNumber + ' + ' + secondNumber + ' = ' + (parseInt(firstNumber) + parseInt(secondNumber));
        console.log(finalText);

        document.getElementById("totalText").innerHTML = finalText;
        localStorage.setItem("lastOperation", operation);

        total = '';
        firstNumber = 0;
        secondNumber = 0;
        operationType = false;
        canUseTotal = false;
        canUseOperator = false;
    }
}