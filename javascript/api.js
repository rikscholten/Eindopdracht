

var api_key = 'eNA67yFTZ3FV5xVTRnrbK8bfyAkoOIQJ';

// Haal games op
function getgames()
{
    $.ajax({
        url: 'https://strategoavans.herokuapp.com/api/games?api_key=' + api_key
    }).done(function (gamess) {


    });

}

// Maak een nieuwe game tegen de AI
function newGame(ai)
{
    $.ajax({
        url: 'https://strategoavans.herokuapp.com/api/games?api_key=' + api_key,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ai: ai})
    }).done(function (game) {
        console.log('New game:');
    });
}

    var socket = io.connect('https://strategoavans.herokuapp.com/', {query: 'api_key=' + api_key});

    socket.on('statechange', function(game) {
        console.log('game overvie change');
        gameOverview();

        if((game.id==currentid) ) {
            currentstate=game.state;
            if ((game.state == 'my_turn' || game.state == 'game_over')) {
                if (game.state == 'game_over') {
                    currentstate = 'game_over';
                }
                playField.drawBoard(currentid);
                console.log('Game changed:', game);
            }
        }

    });


socket.on('move', function(move) {
    console.log('Move:', move);
})

