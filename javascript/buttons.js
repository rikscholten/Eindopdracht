document.getElementById("new_game").addEventListener("click", function(){ 
	var div = document.createElement('div');

	div.className = 'game waiting_for_opponent';

	document.getElementsByClassName('gamelist')[0].appendChild(div);
});

$('#new_ai_game').on("click", function(){
     newAIgame();
    gameOverview();
});

$('#delete_games').on("click", function(){
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

$('.back_button').on("click", function(){
	var games = document.getElementById("games");

	games.className = "box screen from-left";

	var game = document.getElementById("game");
	game.className += " hidden";
});

/* ingame buttons */

$('.randomize_pieces').on( "click", function(){
    console.log('test')
	playField.randomLayout();
});

$('.clear_board').on("click", function(){
	playField.clearField();
});

$('.submit_board').on("click", function(){
    playField.submitBoard();
});

/* ------END------*/