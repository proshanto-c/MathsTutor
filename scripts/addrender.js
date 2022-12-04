const {ipcRenderer} = require('electron');

const number1 = document.getElementById('number1');
const number2 = document.getElementById('number2');
const randButton = document.getElementById('randomise');
const digitSlider = document.getElementById('digits');

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
}

randButton.addEventListener('click', () => {
    digits = digitSlider.value;
    randomiseNumbers();
});


