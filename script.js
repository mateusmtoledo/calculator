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
        resetConfig();
        return 'ERROR';
    }
    return a / b;
}

function power(a, b) {
    return a ** b;
}

function operate(a, b, operator) {
    return operator(a, b);
}

function resetConfig() {
    clicked = 0;
    num = undefined;
    needsReset = false;
    operation = undefined;
    display.textContent = 0;
}

function setOperator(operator) {
    switch(operator) {
        case '*':
            operation = multiply;
            break;
        case '/':
            operation = divide;
            break;
        case '+':
            operation = sum;
            break;
        case '-':
            operation = subtract;
            break;
        case '^':
            operation = power;
            break;
    }
}

let clicked = 0;
let operation;
let num;
let needsReset = false;
const display = document.querySelector('.display');
const numbers = [...document.querySelectorAll('.number')];
const numberKeys = [];

const clear = document.querySelector('.clear');
clear.addEventListener('click', resetConfig);

const del = document.querySelector('.del');
del.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === '') display.textContent = '0';
});

const equals = document.querySelector('.equals');
equals.addEventListener('click', () => {
    if (typeof operation !== 'function') return;
    display.textContent = operate(num, Number(display.textContent), operation);
    operation = undefined;
    num = undefined;
})

const operators = [...document.querySelectorAll('.operator')];
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        needsReset = true;
        if(num === undefined) {
            num = Number(display.textContent);
            setOperator(operator.textContent);
            return;
        }
        display.textContent = (num = operate(num, Number(display.textContent), operation));
        setOperator(operator.textContent);
    });
});

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', () => {
    if (display.textContent.includes('.')) return;
    else display.textContent += '.';
});

numbers.forEach(number => {
    numberKeys[number.textContent] = number;
    number.addEventListener('click', () => {
        clicked = number.textContent;
        if(display.textContent === '0' || needsReset) {
            display.textContent = clicked;
            needsReset = false;
        }
        else display.textContent += clicked;
    });
});