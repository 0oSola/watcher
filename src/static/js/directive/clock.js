(function(){
	angular.module('clock', [])
	.directive('clock', ['$interval','$timeout',function ($interval,$timeout) {
		return {
			restrict: 'AE',
			templateUrl:'../pages/templates/clock.html',
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
					var time = date.toTimeString();
					$scope.timer.hour = time.substring(0,time.indexOf(":")+1);
					$scope.timer.minute = time.substring(time.indexOf(":")+1,time.indexOf(":")+6);
					switch(date.getDay()){
						case 0:
							$scope.timer.day = '星期天';
							break;
						case 1:
							$scope.timer.day = '星期一';
							break;
						case 2:
							$scope.timer.day = '星期二';
							break;
						case 3:
							$scope.timer.day = '星期三';
							break;
						case 4:
							$scope.timer.day = '星期四';
							break;
						case 5:
							$scope.timer.day = '星期五';
							break;
						case 6:
							$scope.timer.day = '星期六';
							break;
					}
					
					//console.log($scope.timer.year);
				}
			},
			link: function (scope, iElement, iAttrs) {
				scope.getDate();
				$timeout(function() {
					iElement.find('.wedge').css('display','none')
				}, 6000);
				$interval(function(){
					scope.getDate();
				},1000)
			}
		};
	}])
})()	