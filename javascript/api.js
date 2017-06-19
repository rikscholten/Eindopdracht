

var api_key = 'eNA67yFTZ3FV5xVTRnrbK8bfyAkoOIQJ';

// Haal games op


// Maak een nieuwe game tegen de AI
function newGame(ai)
{
    $.ajax({
        'async': false,
        url: 'https://strategoavans.herokuapp.com/api/games?api_key=' + api_key,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ai: ai})
    }).done(function (game) {
        console.log('New game:');
    });
}


    var socket = io.connect('https://strategoavans.herokuapp.com/', {query: 'api_key=' + api_key});
socket.on('connect', function() {
    console.log('Connected')
})
    socket.on('statechange', function(game) {
        console.log('game overvie change');
        gameOverview();

        console.log('game.state: '+game.state);
        if((game.id==currentid) ) {
            currentstate=game.state;
            if(game.state)
            {

                $('.player_turn').empty().append("<p>Game Status (turn): "+game.state+"</p>");
                $('.player_turn').show();
            }
            if ((game.state == 'my_turn' || game.state == 'game_over')) {
                if (game.state == 'game_over') {
                    currentstate = 'game_over';
                    $('.winner_game').append("<p>Winner: "+game.winner+"</p>");
                    $('.winner_game').show();
                }
                else
                {
                    $('.winner_game').hide();
                }

                playField.drawBoard(currentid);
            }
        }

    });





function newgameCheck()
{
    var returnbool= function() {
        var tmp = true;
        $.ajax({
            'async': false,
            'url': 'https://strategoavans.herokuapp.com/api/games?api_key=' + api_key,
            'success': function (gamess) {
                $(gamess).each(function (game) {
                    console.log(this.state)
                    if (this.state == 'waiting_for_an_opponent') {
                        console.log('already searching for opponent');
                        tmp = false;
                    }
                })
            }
        });
        return tmp;
    }();
console.log('returnbool: '+returnbool)
return returnbool;
}
