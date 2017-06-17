function submitAIGame()
{
    setOpponent
}
var currentid='';
var currentopponent='';
var currentstate='';
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
            var opponent = this.opponent;
            var state = this.state;
            div.addEventListener("click", function(){
                console.log("dit is game: "+id+"")
                currentid=id;
                currentstate=state;
                currentopponent=opponent;
                playField.drawBoard(id);
                $("#games").addClass("hidden");

                $("#game").removeClass("hidden");
                if(currentstate=='waiting_for_pieces')
                {
                    $(".randomize_pieces").show();
                    $(".clear_board").show();
                    $(".submit_board").show();
                }
                else
                {
                    $(".randomize_pieces").hide();
                    $(".clear_board").hide();
                    $(".submit_board").hide();
                }



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

function getIdGame()
{

}

function legalMove(startX,startY,endX,endY,piecetodrop)
{
    var legalmove = false;
//piece logica
    if(field[endX][endY]!="O"||field[endX][endY]!=" ")
    {
        console.log('condition 2')
        legalmove = true;
    }
    if(['B', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'S', 'F'].includes(field[endX][endY]))
    {
        console.log('condition 1')
        legalmove=false;
    }
    if(((endX == 4 && endY ==2)||(endX == 4 && endY ==3)||(endX == 4 && endY ==3)||(endX == 5 && endY ==2)||(endX == 5 && endY ==3)||(endX == 4 && endY ==6)||(endX == 4 && endY ==7)||(endX == 5 && endY ==6)||(endX == 5 && endY ==7))){

        console.log('condition 3')
        legalmove = false;
    }
    console.log('startX: '+startX+'  startY: '+startY+'  endX: '+endX+'  endY: '+endY+'  piecetodrop: '+piecetodrop+'')
    return legalmove;
}

function movePiece()
{

}


gameOverview();

