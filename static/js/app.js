(function(){
	var app = angular.module("watcher",[]);

	app.controller("boxController",function(){

	})

	app.directive("boxList",function(){
		return {
			restrict:"A",
			scope:{},
			link:function($scope,$ele,$attrs){
				$ele.find("ul").mixItUp({
				    controls: {
				    	enable: false
				    },
				    callbacks: {
				    	onMixStart: function(){
				    		$('.cd-fail-message').fadeOut(200);
				    	},
				      	onMixFail: function(){
				      		$('.cd-fail-message').fadeIn(200);
				    	}
				    }
				});
			}
		}
	})

	app.directive("box",function(){
		return {
			restrict:"EA",
			scope:{},
			controller:["$scope","$http",function($scope,$http){
				$scope.request = function(action){
					return $http({
						url:"",
						method:"POST",
					})
				}
			}],
			require:"^?boxList",
			link:function($scope,$ele,$attrs){

				var builder = {
					//加载图表
					buildChart:function(target_id,chartType,chart_data,x_name,y_name,chartname){
						if(chartType == "area"){
							chartEg = areaChart(chart_data,x_name,y_name,chartname,target_id);
						}else if(chartType == "bar"){
							chartEg = barChart(chart_data,x_name,y_name,chartname,target_id);
						}else if(chartType == "column"){
							chartEg = column2Chart(chart_data,x_name,y_name,chartname,target_id);
						}else if(chartType == "pie"){
							if(x_name.length!=0){
								chartEg = pieChart(chart_data,x_name,chartname,target_id);
							}else{
								chartEg = pieChart(chart_data,chartname,x_name,target_id);
							}
						}
					}
				}
				
				$scope.request().then(function successCallback(response){
					var data = response.data;
					builder.buildChart();
				},function errorCallBack(){

				})
				
				


			}
		}
	})
})()