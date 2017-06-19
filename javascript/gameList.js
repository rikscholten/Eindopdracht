function gameOverview()
{

    $.ajax({
        url: 'https://strategoavans.herokuapp.com/api/games?api_key=' + api_key
    }).done(function (games) {
        $('.gamelist').html('');
        jQuery.each(games, function() {
            var div = document.createElement('div');
            div.className = 'game ' + this.state + '';
            var text = document.createElement('p');
            text.innerHTML='Opponent: '+this.opponent;
            div.appendChild(text);
            var text = document.createElement('p');
            text.innerHTML='Status: '+this.state.split('_').join(' ');;
            div.appendChild(text);
            var me = this;
            if(this.winner!=undefined)
            {

                var text = document.createElement('p');
                text.innerHTML='Winaar: '+this.winner;
                div.appendChild(text);
            }
                div.addEventListener("click", function () {

                    currentstate = me.state;
                    currentid = me.id;
                    currentopponent = me.opponent;
                    if (!(me.state == 'waiting_for_opponent_pieces' || me.state == 'waiting_for_an_opponent')) {
                        playField.drawBoard(me.id);
                        $("#games").addClass("hidden");

                        $("#game").removeClass("hidden");
                        if (currentstate == 'waiting_for_pieces') {
                            $('#placing_pieces').find('h1')[0].innerHTML="Pieces";
                            $('.player_turn').hide();
                            $('.winner_game').hide();
                            $(".randomize_pieces").show();
                            $(".clear_board").show();
                            $(".submit_board").show();
                        }
                        else {
                            if(me.state !='waiting_for_pieces'&&me.state !='waiting_for_opponent_pieces' )
                            {

                                $('.player_turn').empty().append("<p>Game Status (turn): "+me.state+"</p>");
                                $('.player_turn').show();
                            }
                            $('#placing_pieces').find('h1')[0].innerHTML="Information";
                            $(".randomize_pieces").hide();
                            $(".clear_board").hide();
                            $(".submit_board").hide();
                        }
                        if (me.state == 'game_over') {

                            $('.winner_game').empty().append("<p>Winner: "+me.winner+"</p>");
                            $('.winner_game').show();
                        }
                        else
                        {
                            $('.winner_game').hide();

                        }
                    }
                    else
                        {alert('EN: This Game is waiting for an opponent to act \r\n  NL:Dit spel is nog op een tegenstander aan het wachten')}


                });
                $('.gamelist').append(div);

        });

    })


}

function deleteAllGames()
{
    $.ajax({
        url: 'https://strategoavans.herokuapp.com/api/games?api_key=' + api_key,
        type: 'DELETE'
    });
}

gameOverview();