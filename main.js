const {app, BrowserWindow, ipcMain, Menu} = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;

const createWindow = () => {
    // Create a window
    mainWindow = new BrowserWindow({
        show: false,
        autoHideMenuBar: true,
        webPreferences: ({
            nodeIntegration: true,
            contextIsolation: false,
        }),
        minWidth: 700,
        minHeight: 400,
    });
    mainWindow.maximize();
    mainWindow.show();

    // Load HTML into window
    mainWindow.loadFile('index.html');
}

// When app is open and ready to start
app.whenReady().then(() => {
    // Create Window
    createWindow();
    // Failsafe for MacOS
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

// Quit when all windows are closed, except on MacOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

// Quit function
ipcMain.on('quitApp', () => {
    app.quit();
})