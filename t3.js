 var T = T || {};

 (function(T, $){
 	var T3 = function(){
 		// this.startGame();
 		this.bindEvents();
 	}

 	T3.prototype = {
 		startGame: function(){

			// set properties
			this.playerTurn = this.setStarterPlayer();
			this.numPlays = 0;
			this.winner = '';
			this.winnerPlay = '';

			// clear board
			$('#t3 input').val('').removeAttr('disabled').removeClass('winner');

			// update text in start button and hide it
			$('#start-game').html('Play again >>').hide();
			
			//hide alert
			$('#alert').css('display', 'none');

			// show current player
			this.showCurrentPlayer();
		},
		setStarterPlayer: function(){
			var playerOptions = ['x', 'o'];
			return playerOptions[Math.floor(Math.random() + 0.5)];
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
	 					// console.log('win row ' + i);
	 					var index = i + 1;
	 					this.winner = this.playerTurn;
	 					this.winnerPlay = 'row-' + index;	 					
	 				}
	 			}
	 		}

	 		// by column
	 		for (i=0; i<3; i++) {
	 			if (this.boardValues[0][i] != '') {
	 				if (this.boardValues[0][i] == this.boardValues[1][i] && this.boardValues[1][i] == this.boardValues[2][i]) {
	 					// console.log('win column ' + i);
	 					var index = i + 1;
	 					this.winner = this.playerTurn;
	 					this.winnerPlay = 'column-' + index;
	 				}
	 			}
	 		}

	 		// across from top to bottom
	 		if (this.boardValues[0][0] != '') {
	 			if (this.boardValues[0][0] == this.boardValues[1][1] && this.boardValues[1][1] == this.boardValues[2][2]) {
	 				// console.log('win across from top to bottom');
	 				this.winner = this.playerTurn;
	 				this.winnerPlay = "ttb";	 				
	 			}
	 		}

 			// across from bottom to top
 			if (this.boardValues[2][0] != '') {
 				if (this.boardValues[2][0] == this.boardValues[1][1] && this.boardValues[1][1] == this.boardValues[0][2]) {
 					// console.log('win across from bottom to top');
 					this.winner = this.playerTurn;
 					this.winnerPlay = "btt";
 				}
 			}
 			if (this.numPlays == 9 && this.winner == '') {
 				this.winner = "No one";
 			}

 		},
 		togglePlayerTurn: function(){
 			if (this.playerTurn == 'x') {
 				this.playerTurn = 'o';
 			} else if (this.playerTurn == 'o') 
 			{
 				this.playerTurn = 'x';
 			}
 			this.showCurrentPlayer();

 		},
 		getBoardValues: function(){
 			var boardValues = [];
 			$('#t3 tr').each(function(i){
 				var boardRow  = [];
 				$('#' + this.id + ' input').each(function(i){
 					boardRow.push($(this).val());
 				});
 				boardValues.push(boardRow);
 			});
 			this.boardValues = boardValues;
 		},
 		endGame: function(winner){


			this.highlightWinnerPlay();

	 		// disable all inputs
	 		$('#t3 input').attr('disabled', 'disabled');
	 		
	 		// display winning message
	 		$('#alert').css('display', 'block');

	 		$('#alert-text').text(this.winner.toUpperCase() + ' wins!');

	 		
	 		
	 	},
	 	highlightWinnerPlay: function(){
	 		
	 		var winnerPlay = this.winnerPlay.split('-');
	 		console.log(winnerPlay);
	 		switch (winnerPlay[0]) {
	 			case 'column':
	 				console.log(winnerPlay);
	 				console.log('#t3 td:nth-child(' + (winnerPlay[1]) + ') input');
	 				$('#t3 td:nth-child(' + winnerPlay[1] + ') input').addClass('winner');
	 			break;
	 			case 'row':
	 				console.log(winnerPlay);
	 				$('#t3 tr:nth-child(' + winnerPlay[1] + ') input').addClass('winner');
	 			break;
	 			case 'ttb':
	 				$('#t3 tr:nth-child(1) td:nth-child(1) input, ' +
	 				  '#t3 tr:nth-child(2) td:nth-child(2) input, ' +
	 				  '#t3 tr:nth-child(3) td:nth-child(3) input').addClass('winner');
	 			break;
	 			case 'btt':
	 				$('#t3 tr:nth-child(3) td:nth-child(1) input, ' +
	 				  '#t3 tr:nth-child(2) td:nth-child(2) input, ' +
	 				  '#t3 tr:nth-child(1) td:nth-child(3) input').addClass('winner');
	 			break;
	 		}
	 	},
	 	showCurrentPlayer: function(){
	 		$('#player').html(this.playerTurn);
	 	},
	 	bindEvents: function(){
	 		var t3 = this;
	 		var winner = '';
	 		$('#start-game').on('click', function(e){
	 			t3.startGame();
	 		});

	 		// on click
	 		$('#t3 input').on('click', function(){
	 			
	 			if ($(this).val() == '') {
	 				
	 				// assign current player's symbol
	 				// and disable input
	 				$(this).val(t3.playerTurn);

	 				// increase number of plays
	 				t3.numPlays+= 1;

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
