const wordWeb = {
    getWordList : function (wordList) {
        return `<p class= "words-info"> Guess Word From Word List</p> <ul>` +
         wordList.map(element =>`
             <li>
                 <span>${element}</span>
             </li>
         `).join('') +
         `</ul>`; 
    },

    getGuessList : function(gamePage, uid){
        if(gamePage.players[uid].uid == uid){
            return `<p class= "words-info"> Correctly Guessed Words </p><ul>` +
                Object.values(gamePage.players[uid]['guessList']).map(element => `                  
                    <li>
                    <span>${element}</span>
                    </li>      
                `).join('') +
                `</ul>`;  
        }  
    },
    
    getNewGameBtn : function(isMatch, uid){
        if(isMatch){
             return wordWeb.getNewGameBtnState("enabled", uid); 
        }
        return wordWeb.getNewGameBtnState("disabled", uid);
    },
	
	
	getInputPanelState : function(isMatch, uid){
        if(isMatch){
             return wordWeb.getInputPanel("disabled",uid); 
			 
        }
		
        return wordWeb.getInputPanel("enabled", uid);
    },
	

    getNewGameBtnState : function(state, uid){
	        return `<div class= "outgoing">
            <form action= "/newGame" method= "POST">
				<input name= "uid" type= "hidden" value= ${uid} />
                <button type= "submit" id= "new-game"`+ state+`>Play Again</button>
            </form>                    
        </div>`;
    },

    getInputPanel : function(state, uid){
        return `<div class= "outgoing">
            <form action= "/guessWord" method = "POST">
                <input name= "text" type= "to-send" value= "" placeholder= "Guess Word" ${state}/>
				<input name= "uid" type= "hidden" value= ${uid} />
                <button type= "submit" id= "submit-button" ${state}>Submit</button>
				
            </form> 
			
        </div>`;
    },
   
    getNoOfMatches : function(gamePage, uid){
        return `
            <div class= "match-info">
                <p>
                    <label> ${wordWeb.getLabelText(gamePage, uid)} </label>
                <p>
            </div>`;
    },

    getLabelText(gamePage,uid){
        if(gamePage.players[uid].isMatch){
            return "Congrats !! You won in "+ gamePage.players[uid].turns +" turns. Secret word is '"+ gamePage.players[uid].word +"'";
        }
        else if(gamePage.players[uid].numberOfMatches > 0){
            return "You matched "+ gamePage.players[uid].numberOfMatches+" letters out of "+ gamePage.players[uid].word.length+" in "+gamePage.players[uid].turns+" turns ";
        }
        else if(!gamePage.players[uid].isValid){
            return "Invalid word!!! Guess another word";
        }
        else{
            return "Good Luck! Guess your word";
        }
    },

    wordPage: function (wordList, gamePage,uid) {
        return `<!DOCTYPE html>
        <html>
        <head>
            <title>Word Guess Game</title>
            <link rel= "stylesheet" type= "text/css" href= "game.css">
        </head>
        <body>
            <h1>Guess A Secret Word</h1>
                ${wordWeb.getInputPanelState(gamePage.players[uid].isMatch, uid)}
                ${wordWeb.getNewGameBtn(gamePage.players[uid].isMatch, uid)}   
                ${wordWeb.getNoOfMatches(gamePage, uid)}
                <div class= "display-panel">
                    <div class= "word-list">
                        <span>${wordWeb.getWordList(wordList)}</span>
                    </div>
                    <div class= "guess-list">
                        <span>${wordWeb.getGuessList(gamePage,uid)}</span>
                    </div>            
                </div>
        </body>
        </html>`;
    },
}

module.exports = wordWeb;