const {ipcRenderer} = require('electron');

// Initialising document variables

// Randomiser section
const digitSelector = document.getElementById('digitSelector');
const randButton = document.getElementById('randomise');
const digitSlider = document.getElementById('digits');
const sliderValue = document.getElementById('sliderValue');
// Problem section
const problem = document.getElementById('problemBox');
const number1 = document.getElementById('number1');
const number2 = document.getElementById('number2');
const answer = document.getElementById('answer');
const submit = document.getElementById('submit');
const ci = document.getElementById('ci');
// Exit app button
const closeApp = document.getElementById('closeApp');
// Pull the name of the page
const operation = document.title;

let v1;
let v2;
// Total value for checking answers
let total;


// Generate a random number with a set number of digits
const generateRandomInteger = (noOfDigits) => {
    const max = 10**noOfDigits;
    const min = 10**(noOfDigits-1);
    let value = (Math.random() * (max-min)) + min;
    return Math.floor(value);
} 

const makeAnswerable = () => {
    number1.innerText = v1;
    number2.innerText = v2;
    problem.style.visibility = "visible";
    problem.style.opacity = "1";
    problem.style.transform = "translateX(0)";
    digitSelector.style.left = "100%";
    digitSelector.style.transform = "translateX(-100%)";
    ci.innerText = '';
    answer.value = '';
}

// Does five main things:
// Randomise the two numbers in the problem seen on screen
// Reset the answer message and clear the answer box
// Sets the total to the actual expected answer to the problem on screen
// Bring the problem box down from behind the top two banners with the numbers generated
// Move the randomiser section to the right of the screen
const randomiseNumbers = (noOfDigits) => {
    v1 = generateRandomInteger(noOfDigits);
    v2 = generateRandomInteger(noOfDigits);
    makeAnswerable();
    if (operation === "Addition") {
        total = v1+v2;
        window.integers.a1 = v1;
        window.integers.a2 = v2;
    }
    else if (operation === "Multiplication") {
        total = v1*v2;
        window.integers.m1 = v1;
        window.integers.m2 = v2;
    }
}

// Run randomiseNumbers when the generate button is clicked
randButton.addEventListener('click', () => {
    const digits = digitSlider.value;
    randomiseNumbers(digits);
});

// Check submitted answer
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

// Quit button
closeApp.addEventListener('click', () => {
    ipcRenderer.send('quitApp');
});

digitSlider.addEventListener('click', () => {
    sliderValue.innerText = digitSlider.value;
})

if (operation === "Addition" && window.integers.a1 !== 0) {
    v1 = window.integers.a1;
    v2 = window.integers.a2;
    total = v1+v2;
    makeAnswerable();
}
else if (operation === "Multiplication" && window.integers.m1 !== 0) {
    v1 = integers.m1;
    v2 = integers.m2;
    total = v1*v2;
    makeAnswerable();
}