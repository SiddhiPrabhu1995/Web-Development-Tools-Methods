"use strict";

const wordList = require('./words');

const players = {};

function startGame(guess, uid){
  if(!players[uid].isMatch){
    takeTurn(guess, uid);
    addGuessWordToList(guess, uid);
	  }
}

function takeTurn(guess, uid) {
  if(!guess || guess.length != players[uid].word.length || !wordList.includes(guess.toUpperCase())) {
    players[uid].isValid = false;
    players[uid].numberOfMatches = 0;
	  }
  else{
    players[uid].turns++;
    if(exactMatch(players[uid].word, guess)) {
      players[uid].isMatch = true;
	        return;
    }
    players[uid].numberOfMatches = compare(players[uid].word, guess);
    players[uid].isValid = true;
  }
}

function exactMatch(word, guess) {
  return word.toUpperCase() === guess.toUpperCase();
}

function pickWord(wordList) {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function compare( word, guess ) {  
	let listWord = word.toLowerCase().split('');
	let guessWord = guess.toLowerCase().split('');
	let matchCount = 0;

	listWord.forEach(function(e) {
		if(guessWord.includes(e)){
			matchCount++;
			guessWord.splice(guessWord.indexOf(e),1);
		}
	});
	return matchCount;
}

function addGuessWordToList(guess, uid){
    if(players[uid].numberOfMatches > 0 && !players[uid].isMatch){
      let word = guess.toUpperCase() +" - LETTERS MATCH: "+ players[uid].numberOfMatches;
      players[uid].guessList.push(word);
	      }
}

function deleteGuessList(uid){
  players[uid].guessList.splice(0, players[uid].guessList.length);
}

function addPlayerInfo(uid){
    if(!playerExists(uid)){
      players[uid] = {uid: uid, word : " ", totalTurns : 0, guessList : [], numberOfMatches : 0, isValid : true, isMatch : false};
	  
    }
}

function playerExists(uid) {
  const record = Object.values(players).includes(uid);
  return (record);
}

function reset(uid){
  this.deleteGuessList(uid);
  this.players[uid].word = pickWord(wordList);
  this.players[uid].turns = 0;
  this.players[uid].isMatch = false;
  this.players[uid].numberOfMatches = 0;
  this.players[uid].isValid = true;  
  
  console.log("Secret word for game id "+this.players[uid].uid+" is: "+ this.players[uid].word);
  return this;
}

const gamePage = {
    compare,
    pickWord,
    exactMatch,
    startGame,
    reset,
    addGuessWordToList,
    players,
    addPlayerInfo,
    playerExists,
    deleteGuessList
}

module.exports = gamePage;