const electron = require("electron");
const url = require("url");
const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu, Document } = electron;
const path = require("path")
const User = require("./models/User");
require("./api/src/loaders/mongodb");
//const {TemplateRoutes} = require("./routes");

const { dialog } = require('electron');


let mainWindow;


app.on('ready', () => {

   mainWindow = new BrowserWindow({
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         preload: path.join(__dirname,'preload.js')
      }
   });
   mainWindow.maximize();
   mainWindow.loadURL(
      url.format({
         pathname: path.join(__dirname, "homepage.html"),
         protocol: "file",
         slashes: true
      })
   );

   const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
   Menu.setApplicationMenu(mainMenu);

   global.window = mainWindow;

   
});


console.log(__dirname)

const mainMenuTemplate = [

   {
      label: 'Back',
      accelerator: 'CmdOrCtrl+[',
      click() { goBack(); }
   },
   {
      label: 'Forward',
      accelerator: 'CmdOrCtrl+]',
      click() { goForward(); }
   },




   {


      label: 'Edit',
      submenu: [
         {
            role: 'undo'
         },
         {
            role: 'redo'
         },
         {
            type: 'separator'
         },
         {
            role: 'cut'
         },
         {
            role: 'copy'
         },
         {
            role: 'paste'
         }
      ]
   },

   {
      label: 'View',
      submenu: [
         {
            role: 'reload'
         },
         {
            role: 'toggledevtools'
         },
         {
            type: 'separator'
         },
         {
            role: 'resetzoom'
         },
         {
            role: 'zoomin'
         },
         {
            role: 'zoomout'
         },
         {
            type: 'separator'
         },
         {
            role: 'togglefullscreen'
         }
      ]
   },

   {
      role: 'window',
      submenu: [
         {
            role: 'minimize'
         },
         {
            role: 'close'
         }
      ]
   },

   {
      role: 'help',
      submenu: [
         {
            label: 'Learn More'
         }
      ]
   }
]
if (process.env.NODE_ENV !== "production") {
   mainMenuTemplate.push(
      {
         label: "Dev-Tools",
         submenu: [
            {
               label: "Dev-Tool Page",
               click(item, focusedWindow) {
                  focusedWindow.toggleDevTools();
               }
            },
            {
               label: "Refresh",
               role: "reload"
            }

         ]
      })



}
function goForward() {
   if (mainWindow.webContents.canGoForward())
      mainWindow.webContents.goForward();
}

function goBack() {
   if (mainWindow.webContents.canGoBack())
      mainWindow.webContents.goBack();
}

