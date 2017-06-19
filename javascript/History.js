
function showHistory()
{
	$(".move").remove();
	$(".attack").remove();

    $.ajax({
        url: 'https://strategoavans.herokuapp.com/api/games/' + currentid + '/moves?api_key=' + api_key
    }).done(function (moves) {
        $("ol").empty();

        jQuery.each(moves, function(move) {

			if(this.attacker == undefined){

				var span = document.createElement('span');
				if(isEven(move)){
					span.className = "red";
					span.innerHTML = "Red";

				}
				else{
					span.className = "blue";
					span.innerHTML = "Blue";
				}
            	var li = document.createElement('li');
            	li.className = "move";

            	if(this.square.column == this.square_to.column && this.square.row < this.square_to.row){
            		//li.innerHTML = "colomn: " + this.square_to.column + ' row: ' + this.square_to.row + ' moved down' + displayAttacker;
            		li.innerHTML = ' piece moved down';
            	}
            	if(this.square.column == this.square_to.column && this.square.row > this.square_to.row){
            		//li.innerHTML = "colomn: " + this.square_to.column + ' row: ' + this.square_to.row + ' moved up' + displayAttacker;
            		li.innerHTML = ' piece moved up';
            	}
            	if(this.square.column < this.square_to.column && this.square.row == this.square_to.row){
            		//li.innerHTML = "colomn: " + this.square_to.column + ' row: ' + this.square_to.row + ' moved right' + displayAttacker;
            		li.innerHTML = ' piece moved right';
            	}
            	if(this.square.column > this.square_to.column && this.square.row == this.square_to.row){
            		//li.innerHTML = "colomn: " + this.square_to.column + ' row: ' + this.square_to.row + ' moved left' + displayAttacker;
            		li.innerHTML = ' piece moved left';
            	}
            	li.prepend(span);
			}
			else {
				var unitNames = ['Bom', 'Maarschalk', 'Generaal', 'Kolonel', 'Majoor', 
            						'Kapitein', 'Luitenant', 'Sergeant', 'Mineur', 'Verkenner', 'Spion', 'Vlag'];

            	var displayAttacker;
            	var displayDefender;

				for (var i = 0; i < playField.units.length; i++) {
	            	if(playField.units[i] == this.attacker){
	            		displayAttacker = unitNames[i]+" ("+i+")";
	            	}
	            	if(playField.units[i] == this.defender){
	            		displayDefender = unitNames[i]+" ("+i+")";
	            	}
	            };

				var spanAtk = document.createElement('span');
				spanAtk.innerHTML = displayAttacker;
				var spanDef = document.createElement('span');
				spanDef.innerHTML = displayDefender;

				if(isEven(move)){
					spanAtk.className = "red";
					spanDef.className = "blue";
				}
				else{
					spanAtk.className = "blue";
					spanDef.className = "red";
				
				}

				var li = document.createElement('li');
            	li.className = "attack";
            	li.innerHTML = ' attacked ';
            	li.prepend(spanAtk);
            	li.append(spanDef);
			}
			$("ol").append(li);


        });

    });
}

function isEven(n) {
  n = Number(n);
  return n === 0 || !!(n && !(n%2));
}
