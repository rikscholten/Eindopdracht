function showGames()
{
    $.ajax({
        url: 'https://strategoavans.herokuapp.com/api/games?api_key=' + api_key
    }).done(function (games) {
        jQuery.each(games, function() {
            console.log(this)
        });


    });
}