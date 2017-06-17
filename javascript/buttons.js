document.getElementById("new_game").addEventListener("click", function(){ 
	var div = document.createElement('div');

	div.className = 'game waiting_for_opponent';

	document.getElementsByClassName('gamelist')[0].appendChild(div);
});

$('#new_game').on("click", function(){
    newGame(false);
    setTimeout(function(){gameOverview()},200);
});


$('#new_ai_game').on("click", function(){
    newGame(true);
    setTimeout(function(){gameOverview()},200);
});

$('#delete_games').on("click", function(){
    deleteAllGames();
    setTimeout(function(){gameOverview()},200);
});

/* enter a game */

var classname = document.getElementsByClassName("game");

var myFunction = function() {
    $("#games").addClass("hidden");

    $("#game").removeClass("hidden");
};

for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', myFunction, false);
}
/*--------------*/

$('.back_button').on("click", function(){
    setTimeout(function(){gameOverview()},400);
    $("#game").addClass("hidden");

    $("#games").removeClass("hidden");
});

/* ingame buttons */

$('.randomize_pieces').on( "click", function(){

    if(currentstate=='waiting_for_pieces') {
        console.log('test')
        playField.randomLayout();
    }
});

$('.clear_board').on("click", function(){

    if(currentstate=='waiting_for_pieces') {
        playField.clearField();
    }
});

$('.submit_board').on("click", function(){
	if(currentstate=='waiting_for_pieces') {
        currentstate='my_turn';
        playField.submitBoard();
        setTimeout(function () {
        }, 500);
        $(".randomize_pieces").hide();
        $(".clear_board").hide();
        $(".submit_board").hide();
    }
});

/* ------END------*/