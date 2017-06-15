
class PlayField {


    constructor(){
    //create playfield array
        for (var i = 0; i < 10; i++) {
            field[i] = new Array(10);
        }

        this.unitsCount = [[6], [1], [1], [2], [3], [4], [4], [4], [5], [8], [1], [1]];
        this.units = ['B', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'S', 'F'];

    }

    createField(x, y,piece){

        field[x][y]= piece;

    }

    newPlayfield(){
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                this.createField(x,y,' ');
            }
        }
    }

    testField(){
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                console.log(field[x][y]);
            }
        }
    }
    drawPieces(){


        //console.log(units[0].length)
        for (var i=0; i < this.units.length; i++) {
            for (var y = 0; y < this.unitsCount[i]; y++) {
                this.drawPiece(i,y, this.units[i]);
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

        var xpos = (x*7);
        var ypos = (y*10);
        document.getElementsByClassName("pieces")[0].appendChild(div);
        div.setAttribute("style" , "top: "+xpos+"%; left:"+ypos+"%;");
        div.onclick = function() { alert(x +", "+ y); };
        var img = document.createElement("img");
        this.img = img;
        img.setAttribute("src", "Images/red_"+piece+".png");
        img.setAttribute("id", "drag"+x+"and"+y);
        img.setAttribute("draggable", "true");

        img.setAttribute("ondragend", "dragstopped(event,this)");
        if((piece=='B')||(piece=='S')||(piece=='F'))
        {
            img.setAttribute("ondragstart", "drag(event," + x + "," + y + ",'" + piece + "')");

        }
        else {
            img.setAttribute("ondragstart", "drag(event," + x + "," + y + "," + piece + ")");
        }
        div.appendChild(img);

    }

    randomLayout(){
        for (var x = 6; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                while(true){
                    
                    var random = Math.floor((Math.random() * 12));
                    if(this.unitsCount[random] > 0){
                        console.log(this.units[random]);
                        this.createField(x, y, this.units[random]);
                        this.unitsCount[random]--;
                        break
                    }
                }
            }
        }

        this.unitsCount = [[6], [1], [1], [2], [3], [4], [4], [4], [5], [8], [1], [1]];
        this.testField();
        
    }

    clearField(){
        $(".piece").removeClass();
        $(".draggable").removeClass();
        for (var x=0; x < this.units.length; x++) {
            for (var y = 0; y < this.unitsCount[x]; y++) {
                $("#drag"+x+"and"+y).remove();
            }
        }

        this.drawPieces();
        
    }

    gettilePiece(x,y)
    {
        return field[x][y];
    }
}

var field = new Array(10);
playField = new PlayField();
playField.newPlayfield();
playField.drawPieces();


