const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
let mainWindow1, mainWindow2, parentWindow, childWindow;

function createWindow() {
  mainWindow1 = new BrowserWindow({ width: 800, height: 600 })
  mainWindow2 = new BrowserWindow({ show: false, width: 800, height: 600, frame: false })
  mainWindow1.loadURL(`file://${__dirname}/one.html`)
  mainWindow2.loadURL(`file://${__dirname}/two.html`)
  mainWindow1.webContents.openDevTools();
  mainWindow2.webContents.openDevTools();
  mainWindow1.on('closed', () => {
    mainWindow1 = null
  })
  mainWindow2.on('closed', () => {
    mainWindow2 = null
  })
  mainWindow2.once('ready-to-show', () => {
    mainWindow2.show();
  })

  // parentWindow = new BrowserWindow({ title: "parent" });
  // childWindow = new BrowserWindow({ show: false, parent: parentWindow, title: 'child' });
  // childWindow.loadURL("https://github.com");
  // childWindow.once("ready-to-show", () => {
  //   childWindow.show();
  // });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})