console.log('from one.js');
const electron = require('electron')
const ipc = electron.ipcRenderer
const BrowserWindow = require("electron").remote.BrowserWindow;
const newWindow = document.getElementById("newWindow");
const errBtn = document.getElementById("errorBtn");
const syncBtn = document.getElementById("syncBtn");
newWindow.addEventListener('click', function (event) {
    let mainWindow3 = new BrowserWindow();
    mainWindow3.loadURL(`file://${__dirname}/three.html`);
    mainWindow3.webContents.openDevTools();
})

errBtn.addEventListener('click', function (event) {
    console.log("123");
    ipc.send('open-error-dialog')
    console.log("456");

})

syncBtn.addEventListener('click', function (event) {
    console.log("123");
    const reply = ipc.sendSync('sync-message');
    console.log(reply);
    console.log("456");
})

ipc.on('opened-error-dialog', function (event, args) {
    console.log(args);
})

