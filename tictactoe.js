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
	 }

	 T3.prototype = {
	 	restartGame: function(){},
	 	checkPlay: function(){},
	 	togglePlayerTurn: function(){
	 		this.playerTurn = 1 - this.playerTurn;
	 	},
	 	bindEvents: function(){}
	 }

	 T.t3 = new T3();

})(T, jQuery);
