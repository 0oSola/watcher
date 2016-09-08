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
				$scope.request = function(){
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
					var data = '{"chart_name":["增加量","激活量"],"y_name":"人数","x_name":["12/14","12/15","12/16","12/17","12/18","12/19","12/20"],"chart_data":[[3, 4, 3, 5, 4, 10, 12],[1, 3, 4, 3, 3, 5, 4]],"data_list":[["日期","设备","新增账户","新增设备"],["2015-01-01","11","0","21"],["2012-01-01","11","10","21"],["2018-01-01","1","0","2"]],"totalCount":100,"error_code":0,"error_message":""}';
					data = angular.fromJson(data);
					builder.buildChart($attrs.id,"area",data.chart_data,data.x_name,data.y_name,data.chart_name);
				},function errorCallBack(){

				})
				
				


			}
		}
	})
})()