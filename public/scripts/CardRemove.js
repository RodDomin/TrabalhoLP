const electron = require('electron');
const { ipcRenderer } = electron;

ipcRenderer.send('softStartup');

var btnform = document.querySelector('.btn_act');
btnform.addEventListener('click', () =>{
    var cont = document.querySelector('.inp');
    ipcRenderer.send('page:remove',cont.value);
});

function createDivs(data){

    var div_card_main = document.createElement('div');
    var div_card_body = document.createElement('div');

    div_card_main.className = 'card m-2';
    div_card_body.className = 'card-body';
    
    var div_card_title = document.createElement('h5');
    var doc = document.createTextNode(data[0]);
 
    div_card_title.className = 'card-title';
    div_card_title.appendChild(doc);
    div_card_body.appendChild(div_card_title);
    div_card_main.appendChild(div_card_body);
    
    var flex = document.getElementsByClassName('d-flex');
    flex[0].appendChild(div_card_main);

}

ipcRenderer.on('item:add', (event, data) => {
    createDivs(data);      
});