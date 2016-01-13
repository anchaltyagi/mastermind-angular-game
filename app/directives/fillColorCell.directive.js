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