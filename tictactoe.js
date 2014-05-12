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
		this.startGame();
		this.bindEvents();
	}

	T3.prototype = {
		startGame: function(){
			
			// set properties
			this.playerTurn = 'x';
			this.winner = '';

			// clear board
			$('#t3 input').val('').removeAttr('disabled');

		},
		checkPlay: function(){

	 		// get board values
	 		this.getBoardValues();

	 		// check for winning matches
	 		this.checkWinningMatches();

	 	},
	 	checkWinningMatches: function(){
	 		
	 		// by row
	 		for (i=0; i<3; i++) {
	 			if (this.boardValues[i][0] != '') {
	 				if (this.boardValues[i][0] == this.boardValues[i][1] && this.boardValues[i][1] == this.boardValues[i][2]) {
	 					console.log('win row ' + i);
	 					this.winner = this.playerTurn;
	 				}
	 			}
	 		}

	 		// by column
	 		for (i=0; i<3; i++) {
	 			if (this.boardValues[0][i] != '') {
	 				if (this.boardValues[0][i] == this.boardValues[1][i] && this.boardValues[1][i] == this.boardValues[2][i]) {
	 					// console.log('win column ' + i);
	 					this.winner = this.playerTurn;
	 				}
	 			}
	 		}

	 		// across from top to bottom
	 		if (this.boardValues[0][0] != '') {
	 			if (this.boardValues[0][0] == this.boardValues[1][1] && this.boardValues[1][1] == this.boardValues[2][2]) {
	 				console.log('win across from top to bottom');
	 				this.winner = this.playerTurn;
	 			}
	 		}

 			// across from bottom to top
 			if (this.boardValues[2][0] != '') {
 				if (this.boardValues[2][0] == this.boardValues[1][1] && this.boardValues[1][1] == this.boardValues[0][2]) {
 					// console.log('win across from bottom to top');
 					this.winner = this.playerTurn;
 				}
 			}

 		},
 		togglePlayerTurn: function(){
 			if (this.playerTurn == 'x') {
 				this.playerTurn = 'o';
 			} else if (this.playerTurn == 'o') 
 			{
 				this.playerTurn = 'x';
 			}
 		},
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
 		},
 		endGame: function(winner){

	 		// disable all inputs
	 		$('#t3 input').attr('disabled', 'disabled');
	 		
	 		// display winning message
	 		console.log(winner + ' wins!');
	 		
	 		// enable "play again" button
	 		$('#play-again').removeAttr('disabled').toggleClass('btn-success').text('Play again!');


	 	},
	 	bindEvents: function(){
	 		var t3 = this;
	 		var winner = '';
	 		$('#play-again').on('click', function(e){
	 			t3.startGame();
	 		});

	 		// on click
	 		$('#t3 input').on('click', function(){
	 			
	 			if ($(this).val() == '') {
	 				
	 				// assign current player's symbol
	 				// and disable input
	 				$(this).val(t3.playerTurn);

	 				// check play for winning matches
	 				t3.checkPlay();
	 				
	 				// if there's a winner, announce it
	 				if (t3.winner != '') {
	 					t3.endGame(t3.winner);
	 				} else {
	 					// if no winner, toggle player turn
	 					t3.togglePlayerTurn();
	 				}

	 			}
	 		});

	 	}
	 }

	 T.t3 = new T3();

	})(T, jQuery);
