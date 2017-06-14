function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev,x,y,piece) {
    ev.dataTransfer.setData("text", ev.target.id);
    field[x][y] = piece;
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    console.log(ev.target);
    console.log(field);

}

function denyDrop(ev) {
    ev.preventDefault();
}