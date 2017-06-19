function allowDrop(ev) {
    ev.preventDefault();
}

var piecetodrop = 0;
var draggedpiece = Array(3);
var  dragged = false;

function drag(ev,x,y,piece) {
    dragged = false;
    ev.dataTransfer.setData("text", ev.target.id);
    piecetodrop = piece;
    if(currentstate=='my_turn')
    {
        draggedpiece[0] = x;
        draggedpiece[1] = y;
        draggedpiece[2] = field[x][y];

    }
}

function drop(ev,newx,newy) {
    ev.preventDefault();
    // console.log('x: '+endx+''+' y: '+endy+'');
    var data = ev.dataTransfer.getData("text");
    // var newx = $(ev.target)[0].style.top.toString().replace('%','')/10;
    // var newy = $(ev.target)[0].style.left.toString().replace('%','')/10;

    //controle voor verplaatsennaar water
    if((legalMove(draggedpiece[0],draggedpiece[1],newx,newy,draggedpiece[2]))&&currentstate=='my_turn')
    {
        ev.target.appendChild(document.getElementById(data));
        field[newx][newy] = ""+piecetodrop+"";
        field[draggedpiece[0]][draggedpiece[1]] = " ";
        $("#drag" + draggedpiece[0] + "and" + draggedpiece[1] + "").attr("ondragstart", "drag(event," + newx + "," + newy + ",'" + draggedpiece[2] + "')");
        $("#drag" + draggedpiece[0] + "and" + draggedpiece[1] + "").attr("id","drag" + newx + "and" + newy + "");

        dragged = true;
        var movetype ='';
        if(field[newx,newy]=='O')
        {
            movetype ='attack';

        }
        else{
            movetype ='move';

        }
        var squarefrom = new Square(draggedpiece[0],draggedpiece[1]);
        var squareto = new Square(newx,newy);
        var defender = field[newx][newy];
        var attackerDestroyed = false;
        var defenderDestroyed = false;


        var move = new Move(movetype,squarefrom,squareto,draggedpiece[2],defender,attackerDestroyed,defenderDestroyed)
        $.ajax({
            url: 'https://strategoavans.herokuapp.com/api/games/'+currentid+'/moves?api_key=' + api_key,
            method: 'POST',
            contentType: "application/json",
            data :JSON.stringify(move),

        });

    }
    else
    {
        console.log('illegal move');

    }

    if((newx>5 && field[newx][newy]== ' ')&&currentstate=='waiting_for_pieces')
    {
        ev.target.appendChild(document.getElementById(data));
        field[newx][newy] = ""+piecetodrop+"";
        dragged = true;
    }

}


