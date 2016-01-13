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