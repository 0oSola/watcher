(function(){
	var app = angular.module('loading', []);
	app.directive('loadingWrap', [function () {
		return {
			restrict: 'E',
			templateUrl:'../pages/templates/loading.html'
		};
	}])
})()