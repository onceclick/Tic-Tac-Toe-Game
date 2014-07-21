var ticTacToe = angular.module('ticTacToe', []);

ticTacToe.controller('TicTacToeController', function ($scope) {
	
	// -------- Empty data array for boxes -------- //

	$scope.boxes = [{},{},{},{},{},{},{},{},{}];


	// -------- Turns -------- //

	$scope.turn = 0;

	$scope.clicked = true;

	// -------- Player Data -------- //

	$scope.players = [
		{
			name: "player1",
			symbol: "X",
			row0: 0,
			row1: 0,
			row2: 0,
			column0: 0,
			column1: 0,
			column2: 0,
			diagonal0: 0,
			diagonal1: 0
		},
		{
			name: "player2",
			symbol: "O",
			row0: 0,
			row1: 0,
			row2: 0,
			column0: 0,
			column1: 0,
			column2: 0,
			diagonal0: 0,
			diagonal1: 0
		}
	];



	// In order to start the game over with a clean board and player data, 
	// we make a copy of the first dataset.

	$scope.newPlayers = angular.copy($scope.players);
	$scope.newBoxes = angular.copy($scope.boxes);

	
	// -------- Game Logic ---------- //

	$scope.box = function(cellIndex){
			var player = $scope.players[$scope.turn%2];
			var playerString = "players["+$scope.turn%2+"]";
			eval("$scope."+playerString+".row"+(Math.floor(cellIndex / 3))+"++");
			eval("$scope."+playerString+".column"+(cellIndex % 3)+"++");

			if (cellIndex % 4 == 0){
				eval("$scope."+playerString+".diagonal0++");
			}
			if ([2,4,6].indexOf(cellIndex) > -1 ){
				eval("$scope."+playerString+".diagonal1++");
			}
			$scope.boxes[cellIndex].isDisabled = true;
			$scope.boxes[cellIndex].clicked = true;
			$scope.boxes[cellIndex].player = playerString;
			$scope.boxes[cellIndex].symbol = player.symbol;

			for (props in $scope.players[$scope.turn%2]){
					if($scope.players[$scope.turn%2][props] == 3){
						$scope.currentPlayer = $scope.players[$scope.turn%2];
						$scope.gameOver = true;
					}
					else if($scope.turn == 8){
						$scope.gameOver = true;
						$scope.tie = true;
					}
				};

			$scope.turn++;
			
	};



	// ------- Start New Game -------- //

	$scope.startOver = function(){
		$scope.players = $scope.newPlayers;
		$scope.boxes = $scope.newBoxes;
		$scope.gameOver = false;
		$scope.newPlayers = angular.copy($scope.players);
		$scope.newBoxes = angular.copy($scope.boxes);
	}
	
});

