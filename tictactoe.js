 var T = T || {};

// on load
// - instantiate object
//  - clear board
//  - reset all counts: play count


// on click
// 	- increase play count
// 	- swith turn to opposing player
// 	- if play count >= 5th:
// 		- check for winning matches
// 			- if found
// 				- declare winner
// 				- ask to play again?
// 					- if play again
// 						- reset board
// 			- else switch turn
// 			- else 
// 				if play count == 6
// 						check for winning matches
// 						if no match
// 							- declare "no winner"
// 							- ask to play again

(function(T, $){
	 var T3 = function(){
	 	this.playCount = 0;
	 	this.maxPlays = 6;
	 	this.playerTurn = 1; // 1 represents X, and 0 represents O
	 	this.restartGame();
	 	this.checkPlay();
	 }

	 T3.prototype = {
	 	restartGame: function(){},
	 	checkPlay: function(){

	 		// get board values
	 		this.getBoardValues();
	 		console.log(this.boardValues);

	 		// if (this.boardValues.length >= 5 ) {
	 			this.checkWinningMatches();
	 		// }

	 	},
	 	checkWinningMatches: function(){
	 		
	 		// by row
	 		for (i=0; i<3; i++) {
	 			if (this.boardValues[i][0] != '') {
	 				if (this.boardValues[i][0] == this.boardValues[i][1] && this.boardValues[i][1] == this.boardValues[i][2]) {
	 				console.log('win row ' + i);
	 				}
	 			}
	 		}

	 		// by column
	 		for (i=0; i<3; i++) {
	 			if (this.boardValues[0][i] != '') {
	 				if (this.boardValues[0][i] == this.boardValues[1][i] && this.boardValues[1][i] == this.boardValues[2][i]) {
	 				console.log('win column ' + i);
	 				}
	 			}
	 		}

	 		// across from top to bottom
 			if (this.boardValues[0][0] != '') {
 				if (this.boardValues[0][0] == this.boardValues[1][1] && this.boardValues[1][1] == this.boardValues[2][2]) {
 				console.log('win across from top to bottom');
 				}
 			}

 			// across from bottom to top
 			if (this.boardValues[2][0] != '') {
 				if (this.boardValues[2][0] == this.boardValues[1][1] && this.boardValues[1][1] == this.boardValues[0][2]) {
 				console.log('win across from bottom to top');
 				}
 			}
 			 		

	 	},
	 	togglePlayerTurn: function(){
	 		this.playerTurn = 1 - this.playerTurn;
	 	},
	 	bindEvents: function(){},
	 	getBoardValues: function(){
	 		var boardValues = [];
	 		$('#t3 .row').each(function(i){
	 			var boardRow  = [];
	 			$('#' + this.id + ' input').each(function(i){
	 				boardRow.push($(this).val());
	 			});
	 			boardValues.push(boardRow);
	 		});
	 		this.boardValues = boardValues;
	 	}
	 }

	 T.t3 = new T3();

})(T, jQuery);
