
class PlayField {


    constructor(){
    //create playfield array
        for (var i = 0; i < 10; i++) {
            field[i] = new Array(10);
        }

    }

    CreateField(x, y,piece){

        field[x][y]= piece;

    }

    NewPlayfield(){
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                this.CreateField(x,y,' ');
            }
        }
    }

    TestField(){
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                console.log(field[x][y])
            }
        }
    }
    drawpieces(){

        for (var x = 6; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                this.drawPiece(x,y,1);
            }
        }
    }

    drawPiece(x,y,piece){
        //
        // this.x = x;
        // this.y = y;
        // this.piece = piece;

        var div = document.createElement("DIV");
        this.div = div;
        div.setAttribute("class", "piece draggable");

        var xpos = (x*10);
        var ypos = (y*10);
        document.getElementsByClassName("pieces")[0].appendChild(div);
        div.setAttribute("style" , "top: "+xpos+"%; left:"+ypos+"%;");
        div.onclick = function() { alert(x +", "+ y); };
        var img = document.createElement("img");
        this.img = img;
        img.setAttribute("src", "Images/red_"+piece+".png");
        img.setAttribute("id", "drag"+x+"and"+y);
        img.setAttribute("draggable", "true");
        img.setAttribute("ondragstart", "drag(event,"+x+","+y+","+piece+")");
        div.appendChild(img);

    }

    gettilePiece(x,y)
    {
        return field[x][y];
    }




}
var field = new Array(10);
playField = new PlayField();
playField.NewPlayfield();
playField.drawpieces();


