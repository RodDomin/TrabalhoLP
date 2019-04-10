const electron = require('electron');
const { ipcRenderer } = electron;

function createDivs(data){
    var div_card_main = document.createElement('div');
    var div_card_body = document.createElement('div');

    div_card_main.className = 'card m-2';
    div_card_body.className = 'card-body';
    
    var div_card_title = document.createElement('h5');
    var doc = document.createTextNode(data[0]);
    var p = [];
    var pnode = [];    

    div_card_title.className = 'card-title';
    div_card_title.appendChild(doc);
    div_card_body.appendChild(div_card_title);
    div_card_main.appendChild(div_card_body);

    for(i = 0; i < 5; i++){
        p[i] = document.createElement('p');
        p[i].className = 'card-text';
    
        pnode[i] = document.createTextNode(data[i+1]);
        p[i].appendChild(pnode[i]);
        div_card_body.appendChild(p[i]);
    }

    var flex = document.getElementsByClassName('d-flex');
    flex[1].appendChild(div_card_main);
}

ipcRenderer.on('item:add', (event, data) => {
    createDivs(data);        
});

ipcRenderer.send('softStartup');