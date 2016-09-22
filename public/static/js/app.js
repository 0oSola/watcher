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
				this.request = function(){
					return $http({
						url:"/getData",
						method:"POST",
						data:{
							type:"10"
						}
					})
				};
				this.requestSingle = function(){
					return $http({
						url:"/getData1",
						method:"POST",
						data:{
							type:"20"
						}
					})
				};
				this.builder = {
					//加载图表
					buildChart:function(target_id,chartType,chart_data,x_name,y_name,chartname){
						if(chartType == "area"){
							chartEg = exampleAreaChart(chart_data,x_name,y_name,chartname,target_id); 
							chartEg = areaChart(chart_data,x_name,y_name,chartname,target_id);
						}else if(chartType == "bar"){
							chartEg = barChart(chart_data,x_name,y_name,chartname,target_id);
						}else if(chartType == "column"){
							chartEg = column2Chart(chart_data,x_name,y_name,chartname,target_id);
						}else if(chartType == "pieChart"){
							if(x_name.length!=0){
								chartEg = pieChart(chart_data,x_name,chartname,target_id);
							}else{
								chartEg = pieChart(chart_data,chartname,x_name,target_id);
							}
						}else if(chartType=='bluecolumnChart'){
							chartEg = bluecolumnChart(chart_data,x_name,y_name,chartname,target_id);
						}else if(chartType == 'blueorangesplineChart'){
							chartEg = blueorangesplineChart(chart_data,x_name,y_name,chartname,target_id); 
						}else if(chartType == 'greencolumnChart'){
							chartEg = greencolumnChart(chart_data,x_name,y_name,chartname,target_id);
						}else if(chartType == 'redgreensplineChart'){
							chartEg = redgreensplineChart(chart_data,x_name,y_name,chartname,target_id); 
						}
					}
				}
			}],
			require:"^?boxList",
		}
	})

	app.directive('detail', [function () {
		return {
			restrict: 'A',
			require:"?^box",
			link: function (scope, iElement, iAttrs) {
				iElement.html();
			}
		};
	}])
	
	app.directive('splineBox',[function(){
		return{
			restrict:"A",
			scope:true,
			require:"?^box",
			link:function(scope, iElement, iAttrs,pctrl){

				setTimeout(function() {
					pctrl.request().then(function successCallback(response){
						var data = response.data.data;
						data = angular.fromJson(data);
						var colorChart = 'redgreensplineChart';
						if(iAttrs.color=="bo"){
							colorChart = 'blueorangesplineChart';
						}
						pctrl.builder.buildChart(iAttrs.id,colorChart,data.chart_data,data.x_name,data.y_name,data.chart_name);

					},function errorCallBack(response){

					})
				}, 200);
			}
		}
	}])
	app.directive('columnBox', [function () {
		return {
			restrict: 'A',
			scope:true,
			require:"?^box",
			link: function (scope, iElement, iAttrs,pctrl) {

				setTimeout(function() {
					pctrl.requestSingle().then(function successCallback(response){
						var data = response.data.data;
						data = angular.fromJson(data);
						pctrl.builder.buildChart(iAttrs.id,"bluecolumnChart",data.chart_data,data.x_name,data.y_name,data.chart_name);
					},function errorCallBack(response){

					})
				}, 200);
				
			}
		};
	}])
	app.directive('columnSingleBox', [function () {
		return {
			restrict: 'A',
			require:"^?box",
			scope:true,
			link: function (scope, iElement, iAttrs,pctrl) {
				pctrl.requestSingle().then(function successCallback(response){
					var data = response.data.data;
					data = angular.fromJson(data);
					pctrl.builder.buildChart(iAttrs.id,"greencolumnChart",data.chart_data,data.x_name,data.y_name,data.chart_name);
				},function errorcallback(response){

				})
			}
		};
	}])

	app.directive('pieBox', [function () {
		return {
			restrict: 'A',
			require:'^?box',
			scope:true,
			link: function (scope, iElement, iAttrs,pctrl) {
				pctrl.request().then(function successCallback(response){
					var data = angular.fromJson(response.data.data);
					pctrl.builder.buildChart(iAttrs.id,'pieChart',data.chart_data,data.x_name,data.y_name,data.chart_name);
				},function errorCallback(){

				})
			}
		};
	}])

})()