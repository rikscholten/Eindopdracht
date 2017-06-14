function allowDrop(ev) {
    ev.preventDefault();
}
var pievetodrop = 0;
function drag(ev,x,y,piece) {
    ev.dataTransfer.setData("text", ev.target.id);
    pievetodrop = piece;
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var newx = $(ev.target)[0].style.top.toString().replace('%','')/10;
    var newy = $(ev.target)[0].style.left.toString().replace('%','')/10;
    //controle voor verplaatsennaar water
    // if(!((newx == 4 && newy ==2)||(newx == 4 && newy ==3)||(newx == 4 && newy ==3)||(newx == 5 && newy ==2)||(newx == 5 && newy ==3)||(newx == 4 && newy ==6)||(newx == 4 && newy ==7)||(newx == 5 && newy ==6)||(newx == 5 && newy ==7))){
    //     ev.target.appendChild(document.getElementById(data));
    //     field[newx][newy] = pievetodrop;
    // }
    if(newx>5)
    {
        ev.target.appendChild(document.getElementById(data));
        field[newx][newy] = pievetodrop;
    }
   console.log(field);

}

function denyDrop(ev) {
    ev.preventDefault();
}

