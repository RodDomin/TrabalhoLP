const electron = require('electron');
const { ipcRenderer } = electron;

var btn_edit;
var btn_remove;

var oldb = document.querySelector('.btn_1');
oldb.addEventListener('click', oldList);

var lucrb = document.querySelector('.btn_2');
lucrb.addEventListener('click', lucroList);

var allb = document.querySelector('.btn_3');
allb.addEventListener('click', allList);

var new_page = document.getElementById("link_but");
new_page.addEventListener('click', () =>{
    ipcRenderer.send('page:new', 'add');
});

var remove_item = document.getElementById('rm_but');
remove_item.addEventListener('click', () => {
    ipcRenderer.send('page:new', 'remove');
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
        if(i == 2){
            p[i].className = 'card-text year';
        }
        else if((i == 3) || (i == 4)){
            p[i].className = 'card-text lucr';
        }
        else{
            p[i].className = 'card-text';
        }
    
        pnode[i] = document.createTextNode(data[i+1]);
        p[i].appendChild(pnode[i]);
        div_card_body.appendChild(p[i]);
    }

    var lucrotag = document.createElement('p');
    lucrotag.className = 'card-text lcr_js';
    div_card_body.appendChild(lucrotag);

    var flex = document.getElementsByClassName('d-flex');
    flex[1].appendChild(div_card_main);

}

ipcRenderer.on('item:add', (event, data) => {
    createDivs(data);      
    new_itens();  
});

function new_itens(){
    btn_edit = document.querySelectorAll('.btn-warning');
    btn_remove = document.querySelectorAll('.btn-danger');
    
    console.log(btn_edit.length);
    console.log(btn_remove.length);
    
    for(i = 0; i < btn_edit.length; i++){
        
        btn_edit[i].addEventListener('click', () =>{
            console.log('edit');
        });

        btn_remove[i].addEventListener('click', () =>{
            console.log('remove');
        });
    }
    
}

function oldList(){
    var old = document.getElementsByClassName('year');
    var aux = 5000;
    var pos;
    var newu = [];
    
    for(i = 0; i < old.length; i++){ newu[i] = Number(old[i].innerText); }
   
    for(i = 0; i < old.length; i++){
        if(aux >  newu[i]){
            aux = newu[i];
            pos = i;
        }
    }    

    var div = document.querySelectorAll('.card');

    for(i = 0; i < div.length; i++){
        if(i != pos){
            div[i].className += ' d-none';
        }
    }
}

function allList(){
    var all = document.querySelectorAll('.card');
    var removeL = document.querySelectorAll('.lcr_js');
    
    
    for(i = 0; i < all.length; i++){
        removeL[i].textContent = '';
        all[i].className = "card m-2"
    }
}

function lucroList(){
    var bts = document.querySelectorAll('.lucr');
    var arr = [];
    var cont = 0, aux = 0;

    for(i = 0; i < bts.length; i = i + 2){
        arr[cont] = 100*(Number(bts[i+1].innerText) / Number(bts[i].innerText));
        arr[cont] -= 100;
        cont++;
    }
    cont = 0;

    for(i = 0; i < arr.length; i++){
        if(arr[i] > aux){
            aux = arr[i];
            cont = i;
        }
    }


    var div = document.querySelectorAll('.card');
    var lucrotag = document.querySelectorAll('.lcr_js');

    for(i = 0; i < div.length; i++){
        if(i != cont){
            div[i].className += ' d-none';
        }
        else{
            lucrotag[i].textContent = arr[cont] + '%';
        }
    }
}