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
                    console.log("dit is game: " + me.id + "")

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

                            $('.winner_game').append("<p>Winner: "+me.winner+"</p>");
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

function getIdGame()
{

}

function legalMove(startX,startY,endX,endY,piecetodrop)
{
    var legalmove = false;
    var movedX =endX-startX;
    var movedY =endY-startY;
//piece logica
    if(field[endX][endY]!="O"||field[endX][endY]!=" ")
    {
        console.log('condition 1')
        legalmove = true;
    }
    if(['B', 'F'].includes(piecetodrop))
    {
        console.log("Illegal move: Bombs & Flags can't move")
        legalmove = false;
    }
    if(['B', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'S', 'F'].includes(field[endX][endY]))
    {
        console.log("Illegal move: Can't move to/attack your own pieces")
        legalmove=false;
    }
    if([ '1', '2', '3', '4', '5', '6', '7', '8', 'S'].includes(piecetodrop))
    {
        if(movedX>1||movedX<-1)
        {
            console.log("Illegal move: Only a scout can move more than 1 space")
            legalmove=false;
        }
        if(movedY>1||movedY<-1)
        {
            console.log("Illegal move: Only a scout can move more than 1 space")
            legalmove=false;
        }
        if(movedY==1&movedX!=0)
        {
            console.log("Illegal move: Can't move diagonally (normal piece)")
            legalmove=false;
        }
        if(movedY==-1&movedX!=0)
        {
            console.log("Illegal move: Can't move diagonally (normal piece)")
            legalmove=false;
        }
        if(movedX==1&movedY!=0)
        {
            console.log("Illegal move: Can't move diagonally (normal piece)")
            legalmove=false;
        }
        if(movedX==-1&movedY!=0)
        {
            console.log("Illegal move: Can't move diagonally (normal piece)")
            legalmove=false;
        }


    }
    if(piecetodrop=='9')
    {

    console.log('verkenner');
        if(movedX<0 && movedY==0)
        {
            for(var i=startX-1;i>endX;i--) {
                if (!checkwater(i, startY))
                {
                    return false
            }
                if(field[i][startY]!=" ")
                {
                    console.log("Illegal move: Scout can't move over another piece (direction: up)")
                    legalmove=false;
                }
            }

        }
        if(movedY>0 && movedX==0)
        {
            for(var i=startY+1;i<endY;i++)
            {
                if (!checkwater(startX,i))
                {
                    return false
                }
                if(field[startX][i]!=" ")
                {
                    console.log("Illegal move: Scout can't move over another piece (direction: right)")
                    legalmove=false;
                }
            }

        }
        if(movedX>0 && movedY==0)
        {
            for(var i=startX+1;i<endX;i++)
            {
                if (!checkwater(i,startY))
                {
                    return false
                }
                if(field[i][startY]!=" ")
                {
                    console.log("Illegal move: Scout can't move over another piece (direction: down)")
                    legalmove=false;
                }
            }

        }
        if(movedY<0 && movedX==0)
        {
            for(var i=startY-1;i>endY;i--)
            {
                if (!checkwater(startX,i))
                {
                    return false
                }
                if(field[startX][i]!=" ")
                {
                    console.log("Illegal move: Scout can't move over another piece (direction: left)")
                    legalmove=false;
                }
            }

        }
        if(movedY>0&movedX!=0)
        {
            console.log("Illegal move: Scout can't move diagonally")
            legalmove=false;
        }
        if(movedY<0&movedX!=0)
        {
            console.log("Illegal move: Scout can't move diagonally")
            legalmove=false;
        }
        if(movedX>0&movedY!=0)
        {
            console.log("Illegal move: Scout can't move diagonally")
            legalmove=false;
        }
        if(movedX<0&movedY!=0)
        {
            console.log("Illegal move: Scout can't move diagonally")
            legalmove=false;
        }
    }
//water
    if(((endX == 4 && endY ==2)||(endX == 4 && endY ==3)||(endX == 4 && endY ==3)||(endX == 5 && endY ==2)||(endX == 5 && endY ==3)||(endX == 4 && endY ==6)||(endX == 4 && endY ==7)||(endX == 5 && endY ==6)||(endX == 5 && endY ==7))){

        console.log("Illegal move: Can't move to water")
        legalmove = false;
    }
    return legalmove;
}

// function getScoutCords(startX,endX,startY,endY)
// {
//     var cords = new Array(10);
//     cords[startX][startY]='x';
//     cords[endX][endY]='x';
//
//
// }
function movePiece()
{

}

function checkwater(endX,endY)
{
    if(((endX == 4 && endY ==2)||(endX == 4 && endY ==3)||(endX == 4 && endY ==3)||(endX == 5 && endY ==2)||(endX == 5 && endY ==3)||(endX == 4 && endY ==6)||(endX == 4 && endY ==7)||(endX == 5 && endY ==6)||(endX == 5 && endY ==7))){

        console.log("Illegal move: can't move trough water")
        return false;
    }
    return true;
}


gameOverview();

