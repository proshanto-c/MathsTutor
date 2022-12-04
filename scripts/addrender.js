const {ipcRenderer} = require('electron');

const number1 = document.getElementById('number1');
const number2 = document.getElementById('number2');
const randButton = document.getElementById('randomise');
const digitSlider = document.getElementById('digits');
const answer = document.getElementById('answer');
const submit = document.getElementById('submit');
const ci = document.getElementById('ci');
const problem = document.getElementById('problem');

let v1;
let v2;
let total;
let digits;

const generateRandomInteger = (noOfDigits) => {
    const max = 10**noOfDigits;
    const min = 10**(noOfDigits-1);
    let value = (Math.random() * (max-min)) + min;
    return Math.floor(value);
} 

const randomiseNumbers = () => {
    v1 = generateRandomInteger(digits);
    v2 = generateRandomInteger(digits);
    total = v1+v2;
    number1.innerText = v1;
    number2.innerText = v2;
    problem.style.opacity = "1";
}

randButton.addEventListener('click', () => {
    digits = digitSlider.value;
    randomiseNumbers();
});

submit.addEventListener('click', () => {
    const userA = answer.value;
    if (userA !== "") {
        const ans = parseInt(userA);
        if (ans === total) {
            ci.innerText = 'That is correct!';
        }
        else {
            ci.innerText = 'That is incorrect!';
        }
    }
    else {
        ci.innerText = 'Please enter a valid number';
    }
})

