document.getElementById("new_game").addEventListener("click", function(){ 
	var div = document.createElement('div');

	div.className = 'game waiting_for_opponent';

	document.getElementsByClassName('gamelist')[0].appendChild(div);
});

document.getElementById("new_ai_game").addEventListener("click", function(){
    newAIgame();
    gameOverview();
});

document.getElementById("delete_games").addEventListener("click", function(){
    deleteAllGames();
    gameOverview();
});

/* enter a game */

var classname = document.getElementsByClassName("game");

var myFunction = function() {
    var games = document.getElementById("games");
	games.className += " hidden";

	var game = document.getElementById("game");
	game.className = "screen from right";
};

for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', myFunction, false);
}
/*--------------*/

document.getElementsByClassName("back_button")[0].addEventListener("click", function(){ 
	var games = document.getElementById("games");

	games.className = "box screen from-left";

	var game = document.getElementById("game");
	game.className += " hidden";
});

/* ingame buttons */

document.getElementsByClassName("randomize_pieces")[0].addEventListener("click", function(){ 
	playField.randomLayout();
});

document.getElementsByClassName("clear_board")[0].addEventListener("click", function(){ 
	playField.clearField();
});

/* ------END------*/