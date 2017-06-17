class gameHistory {

	constructor(){
		
	}


	updateHistory(){
		getMoves();	
	}






}

socket.on('move', function(move) {
	console.log('Move:', move);
})