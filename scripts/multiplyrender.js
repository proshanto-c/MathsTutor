const {ipcRenderer} = require('electron');

const number1 = document.getElementById('number1');
const number2 = document.getElementById('number2');

let v1= Math.floor(Math.random() * 1000);
let v2= Math.floor(Math.random() * 1000);

number1.innerText = v1;
number2.innerText = v2;
