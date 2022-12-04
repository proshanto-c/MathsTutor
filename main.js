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
            preload: path.join(__dirname, 'scripts', 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }),
    });
    mainWindow.maximize();
    mainWindow.show();

    // Load HTML into window
    mainWindow.loadFile('index.html');

    // Open Dev Tools
    // mainWindow.webContents.openDevTools();
}

// When app is open and ready to start
app.whenReady().then(() => {
    // Create Window
    createWindow();
    // Failsafe for MacOS
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })

    // Build Menu from Template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    // Menu.setApplicationMenu(mainMenu);
})

// Quit when all windows are closed, except on MacOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

// Create Menu Template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label: 'Generate new numbers',
                accelerator: process.platform == 'darwin' ? 'Command+R' : 'Ctrl+R'
            },
            {
                label: 'Show solution'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

ipcMain.on('quitApp', () => {
    app.quit();
})

ipcMain.on('add', () => {
    mainWindow.webContents.send('additionCall');
})