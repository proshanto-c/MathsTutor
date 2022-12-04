const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    quitApp: () => ipcRenderer.send('quitApp'),
    add: () => ipcRenderer.send('add'),
    onAdditionCall: () => ipcRenderer.on('additionCall'),
})