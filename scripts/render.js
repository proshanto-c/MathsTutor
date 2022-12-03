const {ipcRenderer} = require('electron');

const information = document.getElementById('info');
information.innerText = `This app is using Chrome (v${versions.chrome()}), 
                            Node.js (v${versions.node()}), and Electron (v
                            ${versions.electron()})`

const closeApp = document.getElementById('closeApp');
closeApp.addEventListener('click', () => {
    ipcRenderer.send('quitApp');
});