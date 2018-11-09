const electron = require('electron')
const path = require('path')
const app = electron.app
const ipc = electron.ipcMain
const BrowserWindow = electron.BrowserWindow
const dialog = electron.dialog
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const Tray = electron.Tray
const iconPath = path.join(__dirname, 'favicon.ico')
const globalShortcut = electron.globalShortcut

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
let mainWindow1, mainWindow2, parentWindow, childWindow;
let tray = null;

function createWindow() {
  mainWindow1 = new BrowserWindow({ width: 800, height: 600 })
  // mainWindow2 = new BrowserWindow({ show: false, width: 800, height: 600, frame: false })
  mainWindow1.loadURL(`file://${__dirname}/one.html`)
  // mainWindow2.loadURL(`file://${__dirname}/two.html`)
  mainWindow1.webContents.openDevTools();
  // mainWindow2.webContents.openDevTools();
  mainWindow1.on('closed', () => {
    mainWindow1 = null
  })
  // mainWindow2.on('closed', () => {
  //   mainWindow2 = null
  // })

  ipc.on('open-error-dialog', function (event) {
    dialog.showErrorBox('An error message', 'Demo of an error message')
    event.sender.send('opened-error-dialog', 'Main process opened the error dialog')
  })

  ipc.on('sync-message', function (event) {
    event.returnValue = 'sync-reply';
  })
  // mainWindow2.once('ready-to-show', () => {
  //   mainWindow2.show();
  // })

  // parentWindow = new BrowserWindow({ title: "parent" });
  // childWindow = new BrowserWindow({ show: false, parent: parentWindow, title: 'child' });
  // childWindow.loadURL("https://github.com");
  // childWindow.once("ready-to-show", () => {
  //   childWindow.show();
  // });
}

function createWindow2() {
  mainWindow2 = new BrowserWindow({ show: false, width: 800, height: 600, frame: false })
  mainWindow2.loadURL(`file://${__dirname}/two.html`)
  mainWindow2.webContents.openDevTools();
  mainWindow2.on('closed', () => {
    mainWindow2 = null
  })
  mainWindow2.once('ready-to-show', () => {
    mainWindow2.show();
  })
}

app.on('ready', function () {
  tray = new Tray(iconPath);
  createWindow();
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          click() {
            createWindow2();
          }
        },
        {
          label: 'Quit',
          click() {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'demo',
      submenu: [
        {
          label: 'sub menu 1',
          type: 'radio',
          click: function () {
            console.log('CLick Sub Menu 1');
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'sub menu 2',
          type: 'radio'
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'about electron',
          click: function () {
            electron.shell.openExternal('http://electron.atom.io')
          },
          accelerator: 'CmdOrCtrl + Shift + H'
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  tray.setContextMenu(menu)
  Menu.setApplicationMenu(menu);

  const ctxMenu = new Menu()
  ctxMenu.append(new MenuItem({
    label: 'Hello',
    click: function () {
      console.log("welcome to context menu");
    }
  }))
  ctxMenu.append(new MenuItem({ role: 'selectall' }))
  mainWindow1.webContents.on('context-menu', function (e, params) {
    ctxMenu.popup(mainWindow1, params.x, params.y)
  })
  globalShortcut.register('Alt+1', function () {
    mainWindow1.show();
  })
})

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