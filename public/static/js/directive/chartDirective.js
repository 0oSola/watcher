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
				this.QuerMiddle = function(type){
					/*console.log(type);*/
					return $http({
						///getData1
						url:'http://10.20.72.64:8080/GM_Monitor/QueryMonitorInfoController/QuerMiddle.do?action='+type+'&jsonp=JSON_CALLBACK',
						method:'JSONP'
					})
				};
				this.getWatch_type = function(){
					return $scope.watch_type;
				},
				this.builder = {
					//图表
					createChart:function(target_id,chartType,date,withTime,status,action_type,type){
						var chart_data = [];
						switch(parseInt(type)){
							case 1:
								$scope.watch_type = '增值服务监控';
							break;
							case 2:
								$scope.watch_type = '';
							break;
							case 3:
								$scope.watch_type = '';
							break;
							case 4:
								$scope.watch_type = 'ICHARGE监控';
							break;
							case 5:
								$scope.watch_type = 'PAYSYS监控';
							break;
						}
						for(i=0;i<date.length;i++){
							if(status[i]==1){
								item = {
									'xname':date[i]+'(异常点)',
									'color':'#e54598',
									'y':withTime[i]
								};
							}else{
								item = {
									'xname':date[i],
									'y':withTime[i]
								};
							}
							
							chart_data.push(item);
							
						}
						if(chartType.indexOf('splineChart')>1){
							var inline_arr = chart_data;
							chart_data = [];
							chart_data.push(inline_arr);
						}
						chartname = ['延迟(秒)'];

						x_name = [];
						for(j=0;j<date.length;j++){
							x_name[j] = date[j].substring(10,date[j].length-3);
						}
						y_name='';

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

	app.directive('splineBox',['$timeout','$interval',function($timeout,$interval){
		return{
			restrict:'A',
			scope:true,
			require:'?^box',
			link:function(scope, iElement, iAttrs,pctrl){

				function getData(){
					var action_type = iAttrs.action;
					pctrl.QuerMiddle(action_type).then(function successCallback(response){
						if(response.data.result==0){
							var id = iElement.find('.chart-box').attr('id');
							iElement.find('.loading').css('display','none');
							var data = response.data;
							data = angular.fromJson(data);
							
							var max = data.status[0];
							var max_idx = 0;
							for(i=0;i<data.status.length;i++){
								if(max<data.status[i]){
									max = data.status[i];
									max_idx = i;
								}
							}
							var max_timer = data.setDate[max_idx];
							scope.max_timer = '最高延迟时间点:'+max_timer.substring(max_timer.indexOf('-')+1,max_timer.length-3);
							scope.max = max.toFixed(2);

							var colorChart = 'redgreensplineChart';
							if(iAttrs.color=='bo'){
								colorChart = 'blueorangesplineChart';
							}
							pctrl.builder.createChart(id,colorChart,data.setDate,data.withTime,data.status,data.action_type,data.type);
							scope.watch_type = pctrl.getWatch_type();
						}else{
							iElement.find('.error-msg').text(response.data.message);
							$timeout(function() {
								getData();
							}, 60000);
						}
					},function errorCallBack(response){
						$timeout(function() {
							getData();
						}, 60000);
					})
				}
				getData();
				$interval(function() {
					getData();
				}, 1200000);
			}
		}
	}])

	app.directive('columnBox', ['$interval','$timeout',function ($interval,$timeout) {
		return {
			restrict: 'A',
			scope:true,
			require:'?^box',
			link: function (scope, iElement, iAttrs,pctrl) {
				
				function getData(){
					var action_type = iAttrs.action;
					pctrl.QuerMiddle(action_type).then(function callback(response){
						if(response.data.result==0){
							var id = iElement.find('.chart-box').attr('id');
							iElement.find('.loading').css('display','none');

							var data = response.data;
							scope.action_type = '类型：'+data.action_type;
							
							var max = data.withTime[0];
							var max_idx = 0;
							for(i=0;i<data.withTime.length;i++){
								if(max<data.withTime[i]){
									max = data.withTime[i];
									max_idx = i;
								}
							}
							var max_timer = data.setDate[max_idx];
							scope.max_timer = '最高延迟时间点:'+max_timer.substring(max_timer.indexOf('-')+1,max_timer.length-3);
							scope.max = max.toFixed(2);
							pctrl.builder.createChart(id,'bluecolumnChart',data.setDate,data.withTime,data.status,data.action_type,data.type);
							scope.watch_type = pctrl.getWatch_type();
						}else{
							iElement.find('.error-msg').text(response.data.message);
							$timeout(function() {
								getData();
							}, 60000);
						}
					},function errorCallBack(response){
						iElement.find('.error-msg').text("连接不上服务器,请联系管理员");
					})
				}
				getData();
				$interval(function() {
				   getData();
				}, 1200000);
				
			}
		};
	}])
	app.directive('columnSingleBox', ['$interval','$timeout',function ($interval,$timeout) {
		return {
			restrict: 'A',
			require:'?^box',
			scope:true,
			link: function (scope, iElement, iAttrs,pctrl) {
				function getData(){
					var action_type = iAttrs.action;
					pctrl.QuerMiddle(action_type).then(function successCallback(response){
						if(response.data.result==0){
							var id = iElement.find('.chart-box').attr('id');
							iElement.find('.loading').css('display','none');

							var data = response.data;
							scope.action_type = '类型：'+data.action_type;

							var max = data.withTime[0];
							var max_idx = 0;
							for(i=0;i<data.withTime.length;i++){
								if(max<data.withTime[i]){
									max = data.withTime[i];
									max_idx = i;
								}
							}
							var max_timer = data.setDate[max_idx];
							scope.max_timer = '最高延迟时间点：'+max_timer.substring(max_timer.indexOf('-')+1,max_timer.length-3);
							scope.max = max.toFixed(2);
							
							var data = response.data;
							data = angular.fromJson(data);
							pctrl.builder.createChart(id,'greencolumnChart',data.setDate,data.withTime,data.status,data.action_type,data.type)
							scope.watch_type = pctrl.getWatch_type();
						}else{
							iElement.find('.error-msg').text(response.data.message);
							$timeout(function(){
								getData();
							},60000);
						}
					},function errorcallback(response){
						iElement.find('.error-msg').text("连接不上服务器,请联系管理员");
					})
				}
				getData();
				$interval(function(){
					getData();
				},1200000)
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
					var id = iElement.find('.chart-box').attr('id');
					iElement.find('.loading').css('display','none');
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
					var id = iElement.find('.chart-box').attr('id');
					iElement.find('.loading').css('display','none');
					iElement.find('.animation-bar').addClass('animation');
				}, 1000);
			}
		};
	}])
})()