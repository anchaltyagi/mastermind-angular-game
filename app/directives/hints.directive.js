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