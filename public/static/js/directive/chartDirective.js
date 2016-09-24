(function(){
	var app = angular.module('chartComponent', []);
	app.directive('boxList',function(){
		return {
			restrict:'A',
			scope:{},
			link:function($scope,$ele,$attrs){
				$ele.find('ul').mixItUp({
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

	app.directive('box',function(){
		return {
			restrict:'EA',
			scope:{},
			require:'^?boxList',
			controller:['$scope','$http',function($scope,$http){
				this.request = function(){
					return $http({
						url:'/getData',
						method:'POST',
						data:{
							type:'10'
						}
					})
				};
				this.requestSingle = function(){
					return $http({
						url:'/getData1',
						method:'POST',
						data:{
							type:'20'
						}
					})
				};
				this.builder = {
					//加载图表
					buildChart:function(target_id,chartType,chart_data,x_name,y_name,chartname){
						if(chartType == 'area'){
							chartEg = exampleAreaChart(chart_data,x_name,y_name,chartname,target_id); 
							chartEg = areaChart(chart_data,x_name,y_name,chartname,target_id);
						}else if(chartType == 'bar'){
							chartEg = barChart(chart_data,x_name,y_name,chartname,target_id);
						}else if(chartType == 'column'){
							chartEg = column2Chart(chart_data,x_name,y_name,chartname,target_id);
						}else if(chartType == 'pieChart'){
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
			
		}
	})
	
	app.directive('splineBox',['$timeout',function($timeout){
		return{
			restrict:'A',
			scope:true,
			require:'?^box',
			link:function(scope, iElement, iAttrs,pctrl){
				$timeout(function() {
					pctrl.request().then(function successCallback(response){
						var id = iElement.find(".chart-box").attr("id");
						iElement.find(".loading").css("display","none");
						var data = response.data.data;
						data = angular.fromJson(data);
						var colorChart = 'redgreensplineChart';
						if(iAttrs.color=='bo'){
							colorChart = 'blueorangesplineChart';
						}
						pctrl.builder.buildChart(id,colorChart,data.chart_data,data.x_name,data.y_name,data.chart_name);

					},function errorCallBack(response){

					})
				}, 1000);
			}
		}
	}])
	app.directive('columnBox', ['$timeout',function ($timeout) {
		return {
			restrict: 'A',
			scope:true,
			require:'?^box',
			link: function (scope, iElement, iAttrs,pctrl) {
				
				$timeout(function() {
					pctrl.requestSingle().then(function successCallback(response){
						var id = iElement.find(".chart-box").attr("id");
						iElement.find(".loading").css("display","none");
						var data = response.data.data;
						data = angular.fromJson(data);
						pctrl.builder.buildChart(id,'bluecolumnChart',data.chart_data,data.x_name,data.y_name,data.chart_name);
					},function errorCallBack(response){

					})
				}, 1000);
				
			}
		};
	}])
	app.directive('columnSingleBox', ['$timeout',function ($timeout) {
		return {
			restrict: 'A',
			require:'?^box',
			scope:true,
			link: function (scope, iElement, iAttrs,pctrl) {
				$timeout(function(){
					pctrl.requestSingle().then(function successCallback(response){
						var id = iElement.find(".chart-box").attr("id");
						iElement.find(".loading").css("display","none");
						var data = response.data.data;
						data = angular.fromJson(data);
						pctrl.builder.buildChart(id,'greencolumnChart',data.chart_data,data.x_name,data.y_name,data.chart_name);
					},function errorcallback(response){

					})
				},1000)
			}
		};
	}])

	app.directive('pieBox', ['$timeout',function ($timeout) {
		return {
			restrict: 'A',
			require:'?^box',
			scope:true,
			link: function (scope, iElement, iAttrs,pctrl) {
				$timeout(function(){
					var id = iElement.find(".chart-box").attr("id");
					iElement.find(".loading").css("display","none");
					pctrl.request().then(function successCallback(response){
						var data = angular.fromJson(response.data.data);
						pctrl.builder.buildChart(id,'pieChart',data.chart_data,data.x_name,data.y_name,data.chart_name);
					},function errorCallback(){

					})
				},1000)
			}
		};
	}])

	app.directive('loadingBox', ['$timeout',function ($timeout) {
		return {
			restrict: 'A',
			require:'?^box',
			scope:true,
			link: function (scope, iElement, iAttrs,pctrl) {
				$timeout(function() {
					var id = iElement.find(".chart-box").attr("id");
					iElement.find(".loading").css("display","none");
					iElement.find('.animation-bar').addClass('animation');
				}, 1000);
			}
		};
	}])
})()