
const electron = require('electron')
let app = electron.app ? electron.app : electron.remote.app
const ipc = electron.ipcRenderer
const shell = electron.shell
const BrowserWindow = require("electron").remote.BrowserWindow;
const newWindow = document.getElementById("newWindow");
const errBtn = document.getElementById("errorBtn");
const syncBtn = document.getElementById("syncBtn");
const shellBtn = document.getElementById("shellBtn");

newWindow.addEventListener('click', function (event) {
    let mainWindow3 = new BrowserWindow();
    mainWindow3.loadURL(`file://${__dirname}/three.html`);
    mainWindow3.webContents.openDevTools();
})

shellBtn.addEventListener('click', function () {
    shell.showItemInFolder('C:\\Users\\vu_xuan_lam\\Desktop\\react-typescript\\src\\public\\favicon.ico');
    shell.openItem('C:/Users/vu_xuan_lam/Desktop/react-typescript/src/public/favicon.ico');
    shell.openExternal('https://electronjs.org/docs/api/browser-window#browserwindowgetfocusedwindow')
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

