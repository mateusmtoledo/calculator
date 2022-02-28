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

function operate(a, b, operator) {
    return operator(a, b);
}

function updateDisplay(num) {
    display.textContent = num;
}

let num1 = 0;
let num2 = 0;
const display = document.querySelector('.display');
const numbers = [...document.querySelectorAll('.number')];
const numberKeys = [];
numbers.forEach(number => {
    numberKeys[number.textContent] = number;
    number.addEventListener('click', () => {
        num1 = Number(number.textContent);
        updateDisplay(num1);
    });
});