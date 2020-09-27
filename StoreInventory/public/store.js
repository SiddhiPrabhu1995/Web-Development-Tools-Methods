'use strict';

(function iife(){

    const itemList = document.querySelector('.items');
    const status = document.querySelector('.status');
    const container = document.querySelector('.container');
    const addItem = document.querySelector('.item-name');
    const addButton = document.querySelector('.add-button');
    
const errMsgs = {
    'default' : 'Oops, there was a problem. Please try again!!!',
    'duplicate': 'Product Name already exists',
    'bad-login' : 'Bad Login! Please enter correct name.',
    'network-error': 'There was an error connecting to the network, please try again',
    'itemname-required' : 'Please enter product name!',
    'element-does-not-exists' : 'The product is no longer available',
    'unauthorize':'Unauthorize User! Please login to use inventory store. ',
      };

function convertError(response) {
    if(response.ok) {
        return response.json();
    }else if(response.status === 401){
        renderLoginPage();
    }
    return response.json().then( err => Promise.reject(err) );
}

const updateStatus = ( err ) => {
    status.innerText = errMsgs[err.code] || errMsgs.default;
}

const resetStatus = (message) =>{
    if(message){
        status.innerHTML = message;
    }else{
        status.innerHTML = "";
    }        
}

fetch('/api', {
    method : 'GET',
    }).catch( () => Promise.reject( { error: 'network-error' }) )
    .then( () => {
        if(document.cookie === ""){
            return getloginPage();
        }
        else{
            renderInventoryPage();
        }
    })
    .catch( err => {
        updateStatus(err);
});

function getloginPage(){
    fetch('/session', {
        method : 'GET',
    }).catch( (err) => Promise.reject( {
        code : 'network-error',
        error: err }) )
    .then(() => {
        renderLoginPage();        
    })
    .catch( err => {
        updateStatus(err);
    })
};

function setloginPage(){
    const name = document.querySelector('.add-name').value;
    fetch(`/session/${name}`, {
            method : 'POST',
        }).catch( (err) => Promise.reject( { 
            code : 'network-error',
            error: err }) )
        .then(convertError)
        .then(() => {
            renderInventoryPage();  
        })
        .catch( err => {
            updateStatus(err);
        })
};

function logout(){
    fetch('/session', {
        method : 'DELETE',
    }).catch( () => Promise.reject( { error: 'network-error' }) )
    .then(convertError)
    .then(() => {
        getloginPage();
    })
    .catch( err => {
        updateStatus(err);
    })
};

function renderLoginPage(message){
    container.innerHTML = `
        <h3>Login</h3>
        <input class="add-name" maxlength="40" name="text" type="text">
        <button class="login-button">Login</button>
    `;

    container.append(status);
    resetStatus(message);
};

function renderInventoryPage(){
    fetch('/items', {
        method: 'GET',
    }).catch( () => Promise.reject( {
        code: 'network-error',
        error : err,
    }) )
    .then(convertError)
    .then((items) => {
        getInventoryPage(items);
    }) 
    .catch( err => {
        updateStatus(err);
    })   
};

function addNewItem(itemName){
    fetch('/items', {
        method: 'POST',
        body : JSON.stringify({name: itemName, quantity: 0}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch( () => Promise.reject( { 
        code : 'network-error',
        error: err }) )
    .then(convertError)        
    .then(items => {
        renderItemList(items);
    })   
    .catch( err => {
        updateStatus(err);
    })
};

function updateItem(itemId, count){
    fetch(`/items/${itemId}`, {
        method: 'PATCH',
        body : JSON.stringify({quantity: count}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch( () => Promise.reject( { 
        code: 'network-error',
        error : err,
    }) )
    .then(convertError)
    .then(items => {
        renderItemList(items);
    })
    .catch( err => {
        if(err.items){
            renderItemList(err.items);
        } 
        updateStatus(err);
    })
};

function deleteItem(itemId){
    fetch(`/items/${itemId}`,{
        method: 'DELETE'
    }).catch( () => Promise.reject( { 
        code: 'network-error',
        error : err,
    }) )
    .then(convertError)
    .then(items => {
        renderItemList(items);
    })
    .catch( err => {
        if(err.items){
            renderItemList(err.items);
        }        
        updateStatus(err);
    })
};

function getInventoryPage(items){
    itemList.innerHTML = "Loading";

    container.innerHTML = `
        <div>
         <button class="logout-button">Logout</button>
       </div>
    `;

    container.append(addItem);
    container.append(addButton);
    container.append(status);
    container.append(itemList);
    
    renderItemList(items);    
    resetStatus("");
};

function renderItemList(items){
    const inventList = Object.keys(items).map((key) => {
        const item = items[key];
        return`
        <li>
        <button data-id="${key}" class="delete">X</button>
        <span data-id="${key}" class="li-item">${item.name}</span>
        <button data-id="${key}" class="update-item">update</button>
        <input data-id="${key}" class="quantity" value=${item.quantity}>
        </li>
        `;
      }).join('');
      
      itemList.innerHTML = inventList;
    resetStatus("");
};

container.addEventListener('click', (event)=> {
    if(event.target.classList.contains('login-button')){
        setloginPage();
    }

    if(event.target.classList.contains('logout-button')){
        logout();
    }

    if(event.target.classList.contains('add-button')){
        addNewItem(addItem.value);
        addItem.value = '';
        addButton.disabled = true;
    }
});

itemList.addEventListener('click', function (event) {    
    const itemId = event.target.dataset.id;
    if(event.target.classList.contains('delete')) {
        deleteItem(itemId);
    }

    if(event.target.classList.contains('update-item')){
        let quantityList = document.querySelectorAll('.quantity');
        let quantity = getDataAttr(quantityList, itemId);
        updateItem(itemId, quantity);
    }    
  });

function getDataAttr(quantityList, itemId){
    for(let q of quantityList){
        if(q.dataset.id === itemId){
            return q.value;
        }
    }
};

addItem.addEventListener('keyup', function (event) {
    const text = event.target.value;
    addButton.disabled = !text;
});

//Initial state
addButton.disabled = true;
})();