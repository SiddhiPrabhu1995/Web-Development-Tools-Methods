const express = require('express');
const app = express();
const PORT = 3000;

const wordWeb = require('./word-web');
const gamePage = require('./game');
const wordList = require('./words');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
	let uid = req.query.uid;
    if(!gamePage.players[uid]){
        uid = Math.floor(Math.random() * 10000);
        gamePage.addPlayerInfo(uid);
        gamepage = gamePage.reset(uid); 
    }  
    res.send(wordWeb.wordPage(wordList, gamePage, uid));
});

app.post('/guessWord', (req, res) => {
    const {text} = req.body;
	const {uid} = req.body;
    gamePage.startGame(text, uid);
    res.redirect('/?uid='+uid);
  });

app.post('/newGame', (req, res) => {
	
	const {uid} = req.body;
    gamepage = gamePage.reset(req.body.uid);
    res.redirect('/?uid='+uid);
});


app.listen(PORT, ()=> console.log(`Listening on http://localhost:${PORT}`));