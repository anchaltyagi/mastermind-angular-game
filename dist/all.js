/**
* MastermindApp Module
*
* Description
*/
angular.module('mastermindApp', []);
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
(function(module) {
	function fillColorCell() {
		var directive = {
			link: linkFunc,
			transclude: false,
			scope: {
				color: '@',
				index: '@'
			}
		}
		return directive;

		function linkFunc($scope, element, attrs) {
			element.bind("click", function(e) {
				//Remove active class and replace with selected color class
				if (angular.element(element).hasClass('active') && $scope.color) {
					element.removeClass("active");
					element.addClass($scope.color);
					$scope.$parent.$parent.vm.addColorCombination($scope.color, $scope.index);
				}
			});
		}
	}
	module.directive('fillColorCell', fillColorCell);
})(angular.module('mastermindApp'))
(function(module) {
	function hints() {
		var directive = {
			link: linkFunc,
			restrict: 'E',
			scope: {
				attempt: '@'
			}
		}
		return directive;

		function linkFunc(scope, element, attrs) {
			//Generate hints balls in UI
			var defaultTemplate = '<ul id="hint'+ scope.attempt + '" class="result-list"><li class="grey"></li><li class="grey"></li><li class="grey"></li><li class="grey"></li></ul>';
			element.html(defaultTemplate).show();
		}
	}
	module.directive('hints', hints);
})(angular.module('mastermindApp'))
(function(module) {
  function looseModal() {
    var directive = {
      template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">Game over!!!!!!!!</h4>' +
        '</div>' +
        '<div class="modal-body">'+
        '<img data-original-width="245" data-original-height="200" data-padding-top="125" data-id="8ykJ4yAnwgK2I" data-image_url="https://media.giphy.com/media/8ykJ4yAnwgK2I/giphy.gif" data-bitly_gif_url="http://gph.is/16GDq6h" data-mp4_url="https://media.giphy.com/media/8ykJ4yAnwgK2I/giphy.mp4" data-still="https://media.giphy.com/media/8ykJ4yAnwgK2I/giphy_s.gif" data-preview-image-url="https://media.giphy.com/media/8ykJ4yAnwgK2I/100.gif" data-tumblr_share_url="https://media.giphy.com/media/8ykJ4yAnwgK2I/giphy-tumblr.gif" data-gif_id="8ykJ4yAnwgK2I" data-absolute-url="/gifs/sad-baby-crying-8ykJ4yAnwgK2I" data-edit-url="/gifs/sad-baby-crying-8ykJ4yAnwgK2I/edit" id="gif" class="a-gif" src="https://media.giphy.com/media/8ykJ4yAnwgK2I/giphy.gif" alt="baby sad crying the help no" style="width: 551px; height: 450px" width="551" height="450">'+
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
      restrict: 'E',
      transclude: false,
      replace: true,
      scope: true,
      link: linkFunc
    };
    return directive;

    function linkFunc($scope, element, attrs) {
      $scope.$watch(attrs.visible, function(value) {
        if (value == true)
          $(element).modal('show');
        else
          $(element).modal('hide');
      });
    }
  }
  module.directive('looseModal', looseModal);
})(angular.module('mastermindApp'))
(function(module) {
  function winModal() {
    var directive = {
      template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">Winner!!!!!!</h4>' +
        '</div>' +
        '<div class="modal-body">'+
        '<img data-original-width="480" data-original-height="360" data-padding-top="45" data-id="YTbZzCkRQCEJa" data-image_url="https://media.giphy.com/media/YTbZzCkRQCEJa/giphy.gif" data-bitly_gif_url="http://gph.is/18Bev0r" data-mp4_url="https://media.giphy.com/media/YTbZzCkRQCEJa/giphy.mp4" data-still="https://media.giphy.com/media/YTbZzCkRQCEJa/giphy_s.gif" data-preview-image-url="https://media.giphy.com/media/YTbZzCkRQCEJa/100.gif" data-tumblr_share_url="https://media.giphy.com/media/YTbZzCkRQCEJa/giphy-tumblr.gif" data-gif_id="YTbZzCkRQCEJa" data-absolute-url="/gifs/party-excited-birthday-YTbZzCkRQCEJa" data-edit-url="/gifs/party-excited-birthday-YTbZzCkRQCEJa/edit" id="gif" class="a-gif" src="https://media.giphy.com/media/YTbZzCkRQCEJa/giphy.gif" alt="happy party birthday excited celebration" style="width: 570px; height: 450px" width="570" height="450">'+
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
      restrict: 'E',
      transclude: false,
      replace: true,
      scope: true,
      link: linkFunc
    };
    return directive;

    function linkFunc($scope, element, attrs) {
      $scope.$watch(attrs.visible, function(value) {
        if (value == true)
          $(element).modal('show');
        else
          $(element).modal('hide');
      });
    }
  }
  module.directive('winModal', winModal);
})(angular.module('mastermindApp'))
(function(module) {
  var Mastermind = function() {

    var secret = [],
      colors = ['yellow', 'red', 'green', 'blue', 'black', 'white'],
      maxAttempts = 10,
      currentAttempt,
      initialized = false;

    /****************************************************
     * PRIVATE METHODS
     *****************************************************/

    // Generates secret code as challenge
    var generateSecretCode = function() {
      var _seceretCode = [];
      for (i = 0; i < 4; i++) {
        _seceretCode[i] = colors[Math.floor(Math.random() * 6)];
      }
      return _seceretCode;
    }

    var getHints = function(combination) {
      var hints = {
          black: 0,
          white: 0
        },
        secretCombination = secret.slice(),
        userCombination = combination.slice(),
        i, x;

      //check for correct positions
      for (i = 0; i < 4; i++) {
        if (userCombination[i] === secretCombination[i]) {
          hints.black += 1;
          secretCombination[i] = userCombination[i] = null;
        }
      }
      //check for incorrect positions
      for (i = 0; i < 4; i++) {
        for (x = 0; x < 4; x++) {
          if (userCombination[i] && secretCombination[x]) {
            if (userCombination[i] === secretCombination[x]) {
              hints.white += 1;
              secretCombination[x] = userCombination[i] = null;
            }
          }
        }
      }

      return hints;
    }

    var startGame = function() {
      if (!initialized) {
        currentAttempt = 1;
        secret = generateSecretCode();
        initialized = true;
      }
    }

    var play = function(combination) {
      var result = {};
      if (++currentAttempt > maxAttempts) {
        result.isGameOver = true;
        return result;
      }
      result.hints = getHints(combination);

      return result;
    }


    return {
      startGame: startGame,
      play: play,
      maxAttempts: maxAttempts,
      secretCode : function(){return secret;}
    };
  };

  module.factory("Mastermind", Mastermind);
})(angular.module('mastermindApp'))