function submitAIGame()
{
    setOpponent
}

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
            text.innerHTML='Status: '+this.state;
            div.appendChild(text);
            var id = this.id;
            div.addEventListener("click", function(){
                console.log("dit is game: "+id+"")
                $("#games").addClass("hidden");

                $("#game").removeClass("hidden");
            });
            $('.gamelist').append(div);

        });

    });


}

function deleteAllGames()
{
    $.ajax({
        url: 'https://strategoavans.herokuapp.com/api/games?api_key=' + api_key,
        type: 'DELETE'
    })
    $('.gamelist').html('');

}

function getIdGame()
{

}


gameOverview()
