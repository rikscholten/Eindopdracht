
class Tiles {
	constructor(){
		

		
	}

	makeTile(x, y){
		console.log(x,y)

		this.x = x;
		this.y = y;

		var div = document.createElement("DIV");
		this.div = div;
		div.setAttribute("class", "tile");
		document.getElementsByClassName("tiles")[0].appendChild(div);
		div.setAttribute("style", "left:" + this.x +"0%; top:" + this.y + "0%;");
	}
}

var board = new Tiles();

for (x = 0; x < 10; x++) { 
	for (y = 0; y < 10; y++) { 
    	board.makeTile(x,y);
	}
}