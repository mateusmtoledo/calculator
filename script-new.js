function sum(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

const display = document.querySelector('.display');

function updateDisplay() {
    if (display.textContent === '0' || needsReset) {
        display.textContent = this.textContent;
        needsReset = false;
    }
    else display.textContent += this.textContent;
}

function calculate() {
    num2 = Number(display.textContent);
    result = operation(num1, num2);
    display.textContent = result;
}

function setOperation() {
    if (num1 !== undefined) calculate();
    num1 = Number(display.textContent);
    switch(this.textContent) {
        case '+':
            operation = sum;
            break;
        case '-':
            operation = subtract;
            break;
        case '*':
            operation = multiply;
            break;
        case '/':
            operation = divide;
            break;
    }
    needsReset = true;
}

let num1, num2, result, operation;

const numberKeys = [...document.querySelectorAll('.number')];
const numbers = numberKeys.sort((a,b) => a.textContent > b.textContent ? 1 : -1);
numbers.forEach(number => number.addEventListener('click', updateDisplay));

const operators = [...document.querySelectorAll('.operator')];
operators.forEach(operator => operator.addEventListener('click', setOperation));