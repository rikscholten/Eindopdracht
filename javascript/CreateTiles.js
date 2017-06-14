
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
                console.log(field[x][y]);
            }
        }
    }
    drawpieces(){
        var units = [['B', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'S', 'F'],[6, 1, 1, 2, 3, 4, 4, 4, 5, 8, 1, 1]];
        console.log(units[0].length)
        for (var i=0; i < units[0].length; i++) {
            for (var y = 0; y < units[1][i]; y++) {
                this.drawPiece(i,y,units[0][i]);
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
        
        var units = [[6], [1], [1], [2], [3], [4], [4], [4], [5], [8], [1], [1]];

        for (var x = 6; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                while(true){
                    
                    var random = Math.floor((Math.random() * 12));
                    if(units[random] > 0){
                        field[x][y] = random;
                        units[random]--;
                        break
                    }
                }
            }
        }
        for (var i = 0; i < units.length; i++) {
            console.log(units[i]);
        };
        for (var x = 6; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                // console.log(field[x][y]);
            }
        }
        
        
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


