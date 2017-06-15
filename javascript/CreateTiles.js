
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
        for (var y = 0; y < 10; y++) {
            for (var x = 0; x < 10; x++) {
                this.createField(x,y,' ');
            }
        }

    }

    testField(){
        
        for (var y = 0; y < 10; y++) {
            for (var x = 0; x < 10; x++) {
                // console.log(field[x][y]);
            }
        }
    }
    drawPieces(){
        
        for (var y = 0; y < this.units.length; y++) {
            for (var x = 0; x < this.unitsCount[y]; x++) {
                this.drawPiece(x,y, this.units[y], false);
            }
        }
    }



    drawPiece(x,y,piece,randomLay){
        
        if(!randomLay){
            var div = document.createElement("DIV");
            this.div = div;
            div.setAttribute("class", "piece draggable");

            var xpos = (x*10);
            var ypos = (y*7);

            $('.pieces')[0].appendChild(div);
            div.setAttribute("style" , "top: "+ypos+"%; left:"+xpos+"%;");
            div.onclick = function() { alert(x +", "+ y); };
        } 
            

        var img = document.createElement("img");
        this.img = img;
        if(piece==" ")
        {
            console.log('empty');
        }
        else if(piece=='O')
        {
            img.setAttribute("src", "Images/blue.png");

        }
        else {
            img.setAttribute("src", "Images/red_" + piece + ".png");
            img.setAttribute("id", "drag" + x + "and" + y);
            img.setAttribute("draggable", "true");
            img.setAttribute("ondragend", "dragstopped(event,this)");
        }


        if((piece=='B')||(piece=='S')||(piece=='F'))
        {
            img.setAttribute("ondragstart", "drag(event," + x + "," + y + ",'" + piece + "')");

        }
        else {
            img.setAttribute("ondragstart", "drag(event," + x + "," + y + "," + piece + ")");
        }
        

        if(randomLay){
            document.getElementsByClassName("tile")[(x*10)+y].appendChild(img);
            field[x][y] = piece;
        }
        else{
            div.appendChild(img);
        }

    }


    drawBoard(id){
        //https://stackoverflow.com/questions/34642796/access-class-function-inside-ajax-success
        var me = this;
        $.ajax({
            url: 'https://strategoavans.herokuapp.com/api/games/'+id+'?api_key=' + api_key
        }).done(function (game) {
            console.log(game.board[0][0]);


            for (var x = 0; x < 10; x++) {
                for (var y = 0; y < 10; y++) {
                    me.drawPiece(x,y,''+game.board[x][y]+'', true);


                }
            }


        });
        return 'x'
    }


    randomLayout(){
        $(".piece").removeClass();
        $(".draggable").removeClass();
        for (var y = 0; y < 15; y++) {
            for (var x = 0; x < 15; x++) {
                $("#drag"+x+"and"+y).remove();
            }
        }

        for (var x = 6; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                while(true){
                    
                    var random = Math.floor((Math.random() * 12));
                    if(this.unitsCount[random] > 0){
                        this.drawPiece(x, y, this.units[random], true );
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
        for (var y = 0; y < 15; y++) {
            for (var x = 0; x < 15; x++) {
                $("#drag"+x+"and"+y).remove();
            }
        }

        this.newPlayfield();
        this.drawPieces();
        
    }

    gettilePiece(x,y)
    {
        return field[x][y];
    }

    submitBoard(){

        if(this.checkBoard()) {
            if (currentopponent == 'ai')
            {

                var startBoard=new Array(4);
                for(var i =0;i<4;i++)
                {
                    startBoard[i]=field[i+6];
                }



                $.ajax({
                    url: 'https://strategoavans.herokuapp.com/api/games/'+currentid+'/start_board?api_key=' + api_key,
                    method: 'POST',
                    contentType: "application/json",
                    data :JSON.stringify(startBoard),

                }).done(function (game) {
                    console.log('submit');
                });



            }

        }

    }

    checkBoard(){
        var filled=true;
        for (var x = 6; x < 10; x++) {
            for (var y = 0; y < 10; y++) {

                if(field[x][y]==''||field[x][y]==' ')
                {
                    filled=false;
                    console.log('board is not filled')

                }
            }
        }
        console.log('filled: '+filled)
        return filled;
    }
}

function setOpponent()
{
    for (var x = 0; x < 4; x++) {
        for (var y = 0; y < 10; y++) {

            field[x][y] = 0;

        }
    }
}


var field = new Array(10);
playField = new PlayField();

playField.newPlayfield();
playField.drawPieces();


