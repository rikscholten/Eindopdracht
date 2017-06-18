var moveNumber = 0;

socket.on('move', function(move) {

	moveNumber++;

	console.log('Move:', move);

	var div = document.createElement('div');

	var text = document.createElement('p');
	text.innerHTML= moveNumber + ' Test';

	div.appendChild(text);
	$('#history').append(div);
})