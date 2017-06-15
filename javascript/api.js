
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
function newAIgame()
{
    $.ajax({
        url: 'https://strategoavans.herokuapp.com/api/games?api_key=' + api_key,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ai: true})
    }).done(function (game) {
        console.log('New game:', game);
    });
}

