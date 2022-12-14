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
// Help section
const helpTag = document.getElementById('helpTag');
const helpButton = document.getElementById('helpMe');
const helpBox = document.getElementById('helpBox');
const shadowBox = document.getElementById('shadowBox');
const pageNo = document.getElementById('pageNo');
const leftPage = document.getElementById('leftPage');
const rightPage = document.getElementById('rightPage');
const pages = [document.getElementById('page1'), document.getElementById('page2'), document.getElementById('page3'), document.getElementById('page4'), document.getElementById('page5')]
const numbers = [document.getElementById('page2n'), document.getElementById('page3n'), document.getElementById('page4n')]
// Multiplication-page-specific elements (help section)
if (operation === "Multiplication") {
    const leftmost = document.getElementById('leftmost');
    const middle = document.getElementById('middle');
    const addSign = document.getElementById('addSign');
    const cl = document.getElementById('cl');
    const r = document.getElementById('r');
    const cr = document.getElementById('cr');
}


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

// Present the question and answer box
const makeAnswerable = () => {
    number1.innerText = v1;
    number2.innerText = v2;
    problem.style.visibility = "visible";
    problem.style.opacity = "1";
    problem.style.transform = "translateX(0)";
    digitSelector.style.left = "100%";
    digitSelector.style.transform = "translateX(-100%)";
    helpTag.style.visibility = "visible";
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

const submission = () => {
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
}

// Check submitted answer
submit.addEventListener('click', () => {
    submission()
})
answer.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        submission();
    }
})


// Quit button
closeApp.addEventListener('click', () => {
    ipcRenderer.send('quitApp');
});

// Make a display for the value that digitSlider is set to that dynamically adjusts
digitSlider.addEventListener('click', () => {
    sliderValue.innerText = digitSlider.value;
})

// Make a helpBox that appears on top of the current page and casts a shadow on top of the page
helpButton.addEventListener('click', () => {
    helpBox.style.visibility = "visible";
    shadowBox.style.visibility = "visible";
    rightPage.style.visibility = "visible";
    setPage(1);
})

// Make it so that clicking away from the helpBox closes it
shadowBox.addEventListener('click', () => {
    helpBox.style.visibility = "hidden";
    shadowBox.style.visibility = "hidden";
    // Have to be called separately since they are specifically called out and defined in the 
    // setPage function
    for (var i = 0; i<pages.length; i++) {
        pages[i].style.visibility = "hidden";
    }
    for (var i = 0; i<numbers.length; i++) {
        numbers[i].style.visibility = "hidden";
    }
    leftPage.style.visibility = "hidden";
    rightPage.style.visibility = "hidden";
    if (operation === "Multiplication") {
        addSign.style.visibility = "hidden";
        leftmost.style.visibility = "hidden";
    }
})

// Help box navigation functions assigned to the directional buttons
rightPage.addEventListener('click', () => {
    const newNo = Number(pageNo.innerText) + 1;
    setPage(newNo);
})
leftPage.addEventListener('click', () => {
    const newNo = Number(pageNo.innerText) - 1;
    setPage(newNo);
})

// setPage function for changing the page on the help screen
const setPage = (newPage) => {
    pageNo.innerText = newPage.toString();
    // Make all pages invisible...
    for (var i = 0; i<pages.length; i++) {
        pages[i].style.visibility = "hidden";
    }
    // ...then make the page that you want visible again
    pages[newPage-1].style.visibility = "visible";
    // Hide the information that's only meant to be stored on the page before or after, 
    // then show the information that's meant to be stored on that specific page but isn't
    // shown on one or more of the pages directly before or after
    switch (newPage) {
        case 1 :
            leftPage.style.visibility = "hidden";
            numbers[0].style.visibility = "hidden";
            // Change coloration on row 2
            if (operation === "Multiplication") {
                cl.innerText = "2";
                r.innerText = "3";
                cr.innerText = "";
            }
            break;
        case 2 :
            leftPage.style.visibility = "visible";
            numbers[0].style.visibility = "visible";
            numbers[1].style.visibility = "hidden";
            // Change coloration on row 2
            if (operation === "Multiplication") {
                cl.innerText = "";
                r.innerText = "2";
                cr.innerText = "3";
            }
            break;
        case 3 :
            numbers[1].style.visibility = "visible";
            numbers[2].style.visibility = "hidden";
            // Change spacing and coloration on total
            if (operation === "Addition") {
                numbers[1].innerText = "11";
            }
            // Change number on row 4 and hide addition sign
            else if (operation === "Multiplication") {
                leftmost.style.visibility = "hidden";
                middle.innerText = "5";
                addSign.style.visibility = "hidden";
            }
            break;
        case 4 :
            rightPage.style.visibility = "visible";
            // Change spacing and coloration on total
            if (operation === "Addition") {
                numbers[1].innerText = "1";
                numbers[2].innerText = "1";
                numbers[2].style.visibility = "visible";            
            }
            // Change number on row 4 and show addition sign
            else if (operation === "Multiplication") {
                leftmost.style.visibility = "visible";
                middle.innerText = "0";
                numbers[2].style.visibility = "hidden";
                addSign.style.visibility = "visible";
            }
            break;
        case 5 :
            rightPage.style.visibility = "hidden";
            // Show total
            if (operation === "Addition") {
                numbers[2].innerText = "9";            
            }
            // Show total
            else if (operation === "Multiplication") {
                numbers[2].style.visibility = "visible";
            }
            break;
    }
}