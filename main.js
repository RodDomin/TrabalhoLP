const { app, BrowserWindow } = require('electron');
const dns = require('dns');

let ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.send('submitForm', formData);

// main.js
ipcMain.on('submitForm', function(event, data) {
   // Access form data here
});

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
  });
  

};

app.on('ready', createWindow);