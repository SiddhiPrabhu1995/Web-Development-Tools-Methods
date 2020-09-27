const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = 3000;

const users = require('./users');

const app = express();
app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

const counter = () =>  {
    let count = 0;
    return () => {
        count += 1;
        return count;
    };
};
const itemId = counter();
const items = {};

app.get('/api', (req, res) => {
    let uId =  users.userExists(req.cookies.uid);
    res.json("/home");  
});

app.get('/session', (req, res) => {
    let uId =  users.userExists(req.cookies.uid);
    if(uId && users.getUser(uId) === undefined){
        res.status(404).json({ code: 'bad-login'});
        return;
    }
    res.json(uId);
});

app.post('/session/:name', (req,res) =>{
    const name  = req.params.name;
    if(!name || name.length === 0 || name.includes('dog') || name.includes('DOG') || name.includes('Dog')){
        res.status(404).json({ code: 'bad-login'});
        return;
     }else if (name){
        const uid = users.addUser(name);
        res.cookie('uid', uid);
        res.json(name); 
    }    
});

app.delete('/session', (req,res) =>{
    const uid = req.cookies.uid;
    if(!req.cookies.uid){
        res.status(401).json({code : 'unauthorize'});
        return;
    }
    users.deleteUser(uid);
    res.clearCookie('uid');
    res.json("Cookie Deleted");
});

app.get('/items', (req, res) =>{
    if(!req.cookies.uid){
        res.status(401).json({code : 'unauthorize'});
        return;
    }
    res.json(items);
});

app.post('/items', express.json(), (req, res) =>{
    const {name, quantity} = req.body;
    let exists = Object.values(items).filter(item => item.name === name);
    if(!req.cookies.uid){
        res.status(401).json({code : 'unauthorize'});
        return;
    }else if(name.length === 0 || name.trim() === ""){
        res.status(404).json({code : 'itemname-required'});
        return;
    }else if(exists.length !== 0){
        res.status(409).json({ code: 'duplicate' }); 
        return;       
    }
    
    items[itemId()] = req.body;
    res.json(items);    
});

app.patch('/items/:itemId', express.json(), (req, res) => {
    const id = req.params.itemId;
    if(!req.cookies.uid){
        res.status(401).json({code : 'unauthorize'});
        return;
    }else if(!items[id]){
        res.status(404).json({ code : 'element-does-not-exists', 'items': items});
        return;
    }
    items[id].quantity = req.body.quantity;
    res.json(items);
});

app.delete('/items/:itemId', (req,res) =>{
    const id = req.params.itemId;
    if(!req.cookies.uid){
        res.status(401).json({code : 'unauthorize'});
        return;
    }else if(!items[id]){
        res.status(404).json({ code : 'element-does-not-exists', 'items': items});
        return;
    }
    delete items[id];
    res.json(items);
})
    
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));