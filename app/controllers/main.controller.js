(function(module) {
	var MainController = function($scope, $document, Mastermind) {
		//Private properties
		var currentCombination = [];
		var currentAttempt = 0;
		var currentAttemptSelectionCount = 0;

		//Bindable properties and functions
		var vm = this;
		vm.startGame = startGame;
		vm.showCode = showCode;
		vm.maxAttempts = maxAttempts;
		vm.setPickedColor = setPickedColor;
		vm.addColorCombination = addColorCombination;
		vm.gameResult = {
			isGameOver: false,
			isWinGame: false
		};
		vm.currentPickedColor = "";
		vm.gameStarted = false;
		vm.hints = [];
		vm.secretCode = [];

		//Initialize the game and make first attempt active
		function startGame() {
			vm.gameStarted = true;
			Mastermind.startGame();
			currentAttempt = 1;
			activateAttemptRow();
		};

		//Show secret code and end game
		function showCode() {
			//Reset game
			abortGame();
			vm.secretCode = Mastermind.secretCode();
		}

		//Generate an array of attempts to make UI dynamic
		function maxAttempts() {
			var attempts = []
			for (var i = Mastermind.maxAttempts; i > 0; i--) {
				attempts.push(i);
			};
			return attempts;
		}

		//Activate current attempt row to play
		function activateAttemptRow() {
			var queryResult = $document[0].getElementById("attempt" + currentAttempt);
			var currentRow = angular.element(queryResult);
			var children = currentRow.children();
			for (var i = 0; i < children.length; i++) {
				if (children[i].nodeType !== 8) {
					angular.element(children[i]).removeClass('grey');
					angular.element(children[i]).addClass('active');
				}
			}
		}

		//Abort game on show code
		function abortGame() {
			var queryResult = $document[0].getElementById("attempt" + currentAttempt);
			var currentRow = angular.element(queryResult);
			var children = currentRow.children();
			for (var i = 0; i < children.length; i++) {
				if (children[i].nodeType !== 8) {
					angular.element(children[i]).removeClass('active');
					angular.element(children[i]).addClass('grey');
				}
			}
		}

		//Pick color on button click
		function setPickedColor(color) {
			vm.currentPickedColor = color;
		}

		//Add user's selected color to user guess combination
		function addColorCombination(color, index) {
			currentAttemptSelectionCount++;
			currentCombination[index] = color;
			if (currentAttemptSelectionCount === 4) {
				play();
			};
		}

		//Play the attempt once all four color combination are selected by user
		function play() {
			vm.hints = [];
			var result = Mastermind.play(currentCombination);
			if (result.isGameOver) {
				vm.gameResult.isGameOver = result.isGameOver;
			} else {
				if (result.hints.black === 4) {
					vm.gameResult.isWinGame = true;
					makeHints(result.hints, updateHints);
				} else {
					makeHints(result.hints, updateHints);
					currentAttemptSelectionCount = 0;
					currentAttempt++;
					currentCombination = [];
					activateAttemptRow();
				}
			}

			$scope.$digest();
		}

		//Update hints balls colors in UI
		function updateHints() {
			var queryResult = $document[0].getElementById("hint" + currentAttempt);
			var currentHintRow = angular.element(queryResult)[0];
			var children = currentHintRow.children;
			for (var i = 0; i < children.length; i++) {
				if (children[i].nodeType !== 8) {
					angular.element(children[i]).removeClass('grey');
					angular.element(children[i]).addClass(vm.hints[i]);
				}
			}
		}

		//Make hints a array to show hints in UI
		function makeHints(hints, callback) {
			if (hints) {
				if (hints.white > 0) {
					for (var i = hints.white; i > 0; i--) {
						vm.hints.push("white");
					}
				}
				if (hints.black > 0) {
					for (var i = hints.black; i > 0; i--) {
						vm.hints.push("black");
					}
				}
			}
			if (vm.hints.length < 4) {
				var remainingHints = 4 - vm.hints.length;
				for (var i = 0; i < remainingHints; i++) {
					vm.hints.push("grey");
				};
			}
			callback();
		}
	}

	MainController.$inject = ['$scope', '$document', 'Mastermind'];
	module.controller('MainController', MainController);
})(angular.module('mastermindApp'));