const { app, BrowserWindow, Menu } = require('electron');
const dns = require('dns');

// let ipcRenderer = require('electron').ipcRenderer;
// ipcRenderer.send('submitForm', formData);

// // main.js
// ipcMain.on('submitForm', function(event, data) {
//    // Access form data here
// });

function createWindow () {

  let win = new BrowserWindow({ width: 800, height: 600 });

  dns.resolve('www.google.com',(error) =>{
    if(error){
      console.log("internet sem funcionar");
      win.loadFile("Views/NoInternet.html");
    }
    else{
      console.log("internet funcionando");
      win.loadFile("index.html");
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
    title: 'Adicionando carro'
  });
  addWindow.loadFile("index.html");
}


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