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
    if (b == 0) {
        needsReset = true;
        return 'ERROR';
    }
    return a / b;
}

function power(a, b) {
    if(a == 0 && b == 0) {
        needsReset = true;
        return 'ERROR';
    }
    return a ** b;
}

const result = document.querySelector('.result');

function updateResult() {
    if ((result.textContent + this.textContent).length > 11 && needsReset === false) {
        alert('ERROR: You can\'t insert more numbers');
        return;
    }
    if (result.textContent === '0' || needsReset) {
        result.textContent = this.textContent;
        needsReset = false;
    }
    else result.textContent += this.textContent;
}

const expression = document.querySelector('.expression');

function updateExpression() {
    if(num1 === undefined) expression.textContent = '';
    else expression.textContent = num1;
    switch(operation) {
        case sum:
            expression.textContent += '+';
            break;
        case subtract:
            expression.textContent += '-';
            break;
        case multiply:
            expression.textContent += '*';
            break;
        case divide:
            expression.textContent += '/';
            break;
        case power:
            expression.textContent += '^';
            break;
    }
}

function calculate() {
    if (num1 === undefined || operation === undefined) return;
    // if (needsReset === true) {
    //     operation = undefined;
    //     needsReset = false;
    //     return;
    // }
    num2 = Number(result.textContent);
    result.textContent = (num1 = (operation(num1, num2)));
    if(result.textContent.length > 11) {
        let exponential = num1.toExponential(7);
        if (exponential.length === 10) result.textContent = exponential;
        else if (exponential.length === 11) result.textContent = num1.toExponential(6);
        else result.textContent = num1.toExponential(5);
    };
    num2 = undefined;
    operation = undefined;
}

function setOperation() {
    calculate();
    num1 = Number(result.textContent);
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
        case '^':
            operation = power;
            break;
    }
    needsReset = true;
}

function addDecimalSeparator() {
    if(result.textContent.includes('.')) return;
    result.textContent += '.';
}

function resetConfig() {
    result.textContent = 0;
    num1 = undefined;
    num2 = undefined;
    operation = undefined;
    needsReset = false;
}

function removeLastChar() {
    result.textContent = result.textContent.slice(0, -1);
    if (result.textContent === '') result.textContent = 0;
}

let num1, num2, operation;
let needsReset = false;

const numberKeys = [...document.querySelectorAll('.number')];
const numbers = numberKeys.sort((a,b) => a.textContent > b.textContent ? 1 : -1);
numbers.forEach(number => number.addEventListener('click', updateResult));

const operators = [...document.querySelectorAll('.operator')];
operators.forEach(operator => operator.addEventListener('click', setOperation));

const equals = document.querySelector('.equals');
equals.addEventListener('click', calculate);

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', addDecimalSeparator);

const del = document.querySelector('.del');
del.addEventListener('click', removeLastChar);

const clear = document.querySelector('.clear');
clear.addEventListener('click', resetConfig);

const buttons = [...document.querySelectorAll('button')];
buttons.forEach(button => button.addEventListener('click', updateExpression));