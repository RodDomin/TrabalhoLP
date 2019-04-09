const { app, BrowserWindow, Menu } = require('electron');
const dns = require('dns');
const path = require('path');
const url = require('url');

let ipcMain = require('electron').ipcMain;
let win;


function createWindow () {

  win = new BrowserWindow({ 
    width: 800, 
    height: 600, 
    icon: 'public/icons/icons8-fiat-500-96.png' 
  });

  dns.resolve('www.google.com',(error) =>{
    if(error){
      console.log("internet sem funcionar");
      win.loadFile("Views/NoInternet.html");
    }
    else{
      console.log("internet funcionando");
      win.loadFile('Views/Caradd.html');
    }

    const MainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(MainMenu);
  });

  win.on('closed', () =>{
    app.quit();
  });
};

function createAddWindow(){
  addWindow = new BrowserWindow({ 
    width: 450, 
    height: 450, 
    title: 'Adicionando carro',
    icon: 'public/icons/icons8-fiat-500-96.png'
  });
  addWindow.loadFile("index.html");
}

ipcMain.on('item:add', function(event, data) {
  console.log(data);
  win.webContents.send('item:add', data);
});

const mainMenuTemplate = [
  {
    label: 'File',
    submenu:[
      {
        label: 'Add car',
        click(){
          createAddWindow();
        }
      },
      {
        label: 'Remove car'
      }
    ]
  }
];

app.on('ready', createWindow);

//Developer Mode
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle Dev Tools',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}