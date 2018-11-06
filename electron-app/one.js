console.log('from one.js');

const BrowserWindow = require("electron").remote.BrowserWindow;
const newWindow = document.getElementById("newWindow");
newWindow.addEventListener('click', function(event) {
    let mainWindow3 = new BrowserWindow();
    mainWindow3.loadURL(`file://${__dirname}/three.html`);
    mainWindow3.webContents.openDevTools();
})