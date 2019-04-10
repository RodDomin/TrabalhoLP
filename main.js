const { app, BrowserWindow, Menu } = require('electron');
const dns = require('dns');
const path = require('path');
const url = require('url');
const fs = require('fs');
const FilesLoc = require('./src/Files');

let ipcMain = require('electron').ipcMain;
let win;

process.env.NODE_ENV = 'develop';

function createWindow () {

  win = new BrowserWindow({ 
    width: 800, 
    height: 600, 
    icon: 'public/icons/icons8-fiat-500-96.png',
    tiel: 'Pagina inicial'
  });
    
  win.loadFile('Views/Caradd.html');
  const MainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(MainMenu);

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

ipcMain.on('softStartup', (event) => {
  fs.readdir('./Data/', function (err, files) {
        
    if(err){
      return console.log(err);
    } 
  
    var MiddleContent = [];
    
    for(i = 0; i < files.length; i++){
      fs.readFile(`./Data/${files[i]}`, 'utf8',  (err, filedata) => {
        if(err){
          console.log(err);
        }
  
        content = JSON.parse(filedata);
                
        MiddleContent[0] = content.Code;
        MiddleContent[1] = content.Name;
        MiddleContent[2] = content.Manufacturer;
        MiddleContent[3] = content.Year;
        MiddleContent[4] = content.BuyPrice;
        MiddleContent[5] = content.SalePrice;
                
        event.sender.send('item:add', MiddleContent);
      });
    }
  });

});

ipcMain.on('item:add', function(event, data) {

  console.log(data);
  FilesLoc.escreveArq(data);
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