const electron = require('electron');
const { ipcRenderer } = electron;

var btn_edit;
var btn_remove;

var new_page = document.getElementById("link_but");
new_page.addEventListener('click', () =>{
    ipcRenderer.send('page:new', 'add');
});

ipcRenderer.send('softStartup');

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

    var button1 = document.createElement('button');
    var button1_node = document.createTextNode('Editar');
    var button2 = document.createElement('button');
    var button2_node = document.createTextNode('Remover');
    var div_buttons = document.createElement('div');
    

    div_buttons.className = 'd-flex flex-row';
    button1.className = 'btn btn-warning m-1';
    button2.classList = 'btn btn-danger m-1';

    button1.appendChild(button1_node);
    button2.appendChild(button2_node);

    div_buttons.appendChild(button1);
    div_buttons.appendChild(button2);

    div_card_body.appendChild(div_buttons);

    var flex = document.getElementsByClassName('d-flex');
    flex[1].appendChild(div_card_main);

    new_itens();
}

ipcRenderer.on('item:add', (event, data) => {
    createDivs(data);        
});

function new_itens(){
    btn_edit = document.getElementsByClassName('btn-warning');
    btn_remove = document.getElementsByClassName('btn-danger');

    for(i = 0; i < btn_edit.length; i++){
        btn_edit[i].addEventListener('click', action('edit'));
        btn_remove[i].addEventListener('click', action('remove'));
    }
    
}

function action(act){
    if(act == 'edit'){
        console.log('edit');
    }
    else{
        console.log('remove');
    }
}