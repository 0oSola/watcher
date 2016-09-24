(function(){
	angular.module('clock', [])
	.directive('clock', [function () {
		return {
			restrict: 'AE',
			templateUrl:'../../../templates/clock.html',
			controller:function ($scope) {
				$scope.timer = {
					year:"111",
					day:"",
					hour:"",
					minute:""
				};
				$scope.getDate = function(){
					var date = new Date();
					$scope.timer.year = date.toLocaleDateString().replace(/[/]/g,'.');
					console.log($scope.timer.year);
				}
			},
			link: function (scope, iElement, iAttrs) {
				scope.getDate();
			}
		};
	}])
})()	