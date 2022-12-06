const {ipcRenderer} = require('electron');

const closeApp = document.getElementById('closeApp');

closeApp.addEventListener('click', () => {
    ipcRenderer.send('quitApp');
});