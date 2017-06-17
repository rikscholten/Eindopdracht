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
    var movedX =endX-startX;
    var movedY =endY-startY;
    console.log('movedX: '+movedX+' movedY: '+movedY);
//piece logica
    if(field[endX][endY]!="O"||field[endX][endY]!=" ")
    {
        console.log('condition 1')
        legalmove = true;
    }
    if(['B', 'F'].includes(piecetodrop))
    {
        console.log('condition 2')
        legalmove = false;
    }
    if(['B', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'S', 'F'].includes(field[endX][endY]))
    {
        console.log('condition 3')
        legalmove=false;
    }
    if([ '1', '2', '3', '4', '5', '6', '7', '8', 'S'].includes(piecetodrop))
    {
        if(movedX>1||movedX<-1)
        {
            console.log('condition 4')
            legalmove=false;
        }
        if(movedY>1||movedY<-1)
        {
            console.log('condition 5')
            legalmove=false;
        }
        if(movedY==1&movedX!=0)
        {
            console.log('condition 5')
            legalmove=false;
        }
        if(movedY==-1&movedX!=0)
        {
            console.log('condition 5')
            legalmove=false;
        }
        if(movedX==1&movedY!=0)
        {
            console.log('condition 5')
            legalmove=false;
        }
        if(movedX==-1&movedY!=0)
        {
            console.log('condition 5')
            legalmove=false;
        }


    }
    if(piecetodrop=='9')
    {

    console.log('verkenner');
        if(movedX<0 && movedY==0)
        {
            console.log('move up');;
            console.log('startY: '+startY)
            for(var i=startX-1;i>endX;i--) {
                console.log('i: ' + i + '   startY: ' + startY)
                if (!checkwater(i, startY))
                {
                    return false
            }
                if(field[i][startY]!=" ")
                {
                    console.log('move over another piece')
                    legalmove=false;
                }
            }

        }
        if(movedY>0 && movedX==0)
        {
            console.log('move right');
            console.log('startY: '+startY)
            for(var i=startY+1;i<endY;i++)
            {
                console.log(i)
                console.log('startX: '+startX)
                console.log(checkwater(i,startY));
                if (!checkwater(startX,i))
                {
                    return false
                }
                if(field[startX][i]!=" ")
                {
                    console.log('move over another piece')
                    legalmove=false;
                }
            }

        }
        if(movedX>0 && movedY==0)
        {
            console.log('move down');
            console.log('startX: '+startX)
            for(var i=startX+1;i<endX;i++)
            {
                console.log(i)
                console.log('startY: '+startY)
                if (!checkwater(i,startY))
                {
                    return false
                }
                if(field[i][startY]!=" ")
                {
                    console.log('move over another piece: '+field[startY][i])
                    legalmove=false;
                }
            }

        }
        if(movedY<0 && movedX==0)
        {
            console.log('move left');
            console.log('startY: '+startY)
            console.log('movedY: '+movedY*-1)
            for(var i=startY-1;i>endY;i--)
            {
                console.log(checkwater(i,startY));
                console.log(i)
                console.log('i: '+i+'   startX: '+startX)
                if (!checkwater(startX,i))
                {
                    return false
                }
                if(field[startX][i]!=" ")
                {
                    console.log('move over another piece: '+field[startX][i])
                    legalmove=false;
                }
            }

        }
        if(movedY>0&movedX!=0)
        {
            console.log('condition 5')
            legalmove=false;
        }
        if(movedY<0&movedX!=0)
        {
            console.log('condition 5')
            legalmove=false;
        }
        if(movedX>0&movedY!=0)
        {
            console.log('condition 5')
            legalmove=false;
        }
        if(movedX<0&movedY!=0)
        {
            console.log('condition 5')
            legalmove=false;
        }
    }

    if(((endX == 4 && endY ==2)||(endX == 4 && endY ==3)||(endX == 4 && endY ==3)||(endX == 5 && endY ==2)||(endX == 5 && endY ==3)||(endX == 4 && endY ==6)||(endX == 4 && endY ==7)||(endX == 5 && endY ==6)||(endX == 5 && endY ==7))){

        console.log('condition 7')
        legalmove = false;
    }
    console.log('startX: '+startX+'  startY: '+startY+'  endX: '+endX+'  endY: '+endY+'  piecetodrop: '+piecetodrop+'')
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

        console.log('condition 7')
        return false;
    }
    return true;
}


gameOverview();

