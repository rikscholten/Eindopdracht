var currentid='';
var currentopponent='';
var currentstate='';

function legalMove(startX,startY,endX,endY,piecetodrop)
{
    var legalmove = false;
    var movedX =endX-startX;
    var movedY =endY-startY;
//piece logica
    if(field[endX][endY]!="O"||field[endX][endY]!=" ")
    {
        console.log('legal move')
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

function checkwater(endX,endY)
{
    if(((endX == 4 && endY ==2)||(endX == 4 && endY ==3)||(endX == 4 && endY ==3)||(endX == 5 && endY ==2)||(endX == 5 && endY ==3)||(endX == 4 && endY ==6)||(endX == 4 && endY ==7)||(endX == 5 && endY ==6)||(endX == 5 && endY ==7))){

        console.log("Illegal move: can't move trough water")
        return false;
    }
    return true;
}

