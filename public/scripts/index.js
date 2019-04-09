const electron = require('electron');
const remote = electron.remote;
const { ipcRenderer } = electron;

var window = remote.getCurrentWindow();
const form = document.querySelector('form');
form.addEventListener('submit', submitform);

function submitform(e){
    e.preventDefault();
    console.log(123);
    const item = document.querySelectorAll('.item');
    var arr = [];
    for(x = 0; x < item.length; x++){
        arr[x] = item[x].value;
    }
  
    ipcRenderer.send('item:add', arr);
    window.close();
}