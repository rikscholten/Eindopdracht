
class Tiles {

	constructor(){

        for (var y = 0; y < 10; y++) {
            for (var x = 0; x < 10; x++) {
                this.makeTile(x,y);
            }
        }




    }

	makeTile(x, y){
		// console.log(x,y)

		this.x = x;
		this.y = y;

		var div = document.createElement("DIV");
		this.div = div;
		div.setAttribute("class", "tile");
		document.getElementsByClassName("tiles")[0].appendChild(div);
		div.setAttribute("style" , "top:" + this.y +"0%; left:" + this.x + "0%;");
        div.setAttribute("ondrop" , "drop(event," + this.y +"," + this.x+")");
        div.setAttribute("ondragover" , "allowDrop(event)");
	}

}

var board = new Tiles();

