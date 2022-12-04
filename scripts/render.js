const {ipcRenderer} = require('electron');

const closeApp = document.getElementById('closeApp');
const addition = document.getElementById('addn');
const multiplication = document.getElementById('multn');

closeApp.addEventListener('click', () => {
    ipcRenderer.send('quitApp');
});

addition.addEventListener('click', () => {
    ipcRenderer.send('add');
});

multiplication.addEventListener('click', () => {
    ipcRenderer.send('multiply');
});