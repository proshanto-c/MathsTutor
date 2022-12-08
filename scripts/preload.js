const {contextBridge} = require('electron');

contextBridge.exposeInMainWorld('integers', {
    m1: 0,
    m2: 0,
    a1: 0,
    a2: 0,
})