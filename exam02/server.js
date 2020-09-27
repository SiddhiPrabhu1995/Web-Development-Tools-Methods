const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = 3000;

const app = express();
const {v4 : uuidv4} = require('uuid');
const userData = require('./user-data');
const collection = require('./recipe-collections');

app.use(cookieParser());
app.use(express.static('./public'));

app.get('/home', (req, res) => {
   const uid = req.cookies.uid;
   if(!userData.users[uid] || !uid){
      res.clearCookie('uid');
      res.status(200).json({'recipeList': collection.recipes});
      return;
   }
   res.status(200).json({'recipeList': collection.recipes, 'uid': uid, 'username': userData.users[uid].username}); 
});

app.get('/session', (req, res) => {
   res.json(collection.recipes);
});

app.post('/session', express.json(), (req, res) => {
   const username = req.body.username;
  
   if(!username || /dog/i.test(username)) {
     res.status(404).json({ code: 'bad-login'});
     return;
   }
   const uid = uuidv4();
   userData.users[uid] = { username, uid};
   res.cookie('uid', uid);
   res.json(collection.recipes);
 });
 
 app.delete('/session', (req,res) =>{
     const uid = req.cookies.uid;
     if(!uid){
         res.status(401).json({code : 'unauthorize'});
         return;
     }
     delete userData.users[uid];
     res.clearCookie('uid');
     res.json(collection.recipes);
 });


app.get('/recipe', (req, res) => {
   const uid = req.cookies.uid;
   if(!uid){
       res.status(401).json({code : 'unauthorize'});
       return;
   }
   res.json(uid);
});

app.post('/recipe', express.json(), (req, res) => {
   const uid = req.cookies.uid;
   if(!uid){
      res.status(401).json({code : 'unauthorize'});
      return;
   }
   const {title, author, ingredients, instructions} = req.body;
   if(!title || !ingredients || !instructions ){
      res.status(404).json({code : 'field-required'});
      return;
   }
   const id = collection.nextId();
   collection.recipes[id] = {title, author, ingredients, instructions};
   res.json(id);
});

app.get('/details/:id', (req, res) => {
   const id = req.params.id;
   const recipeId = collection.recipes[id];
   
   res.json(recipeId);
});

app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));