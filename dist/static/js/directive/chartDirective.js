!function(){var app=angular.module("chartComponent",[]),http_addr="http://10.20.72.64:8080";app.directive("boxList",["$http","$compile",function($http,$compile){return{restrict:"A",scope:{},link:function($scope,$ele,$attrs){chart_type=["bc","rgs","gc","bos"];var color_idx=0;$http({url:http_addr+"/GM_Monitor/QueryMonitorInfoController/QuerMiddle.do?action=interfaceConfig&jsonp=JSON_CALLBACK",method:"JSONP"}).then(function(response){if(0==response.data.result){actionlist=response.data.ACTION,namelist=response.data.ACTION_NAME;for(var i=0;i<actionlist.length;i++){var tpl=$($(".little-tpl").html()).addClass("mix");2==i&&(console.log(namelist[i]),tpl=$($(".big-tpl").html()).addClass("mix")),actionlist[i].indexOf("paysys")>=0&&tpl.addClass("type-3"),tpl.find(".title").html(namelist[i].toUpperCase()+"监控"),tpl.find(".chart-box").attr("id",actionlist[i]),tpl.find(".main-box").attr("action",actionlist[i]),color_idx>3&&(color_idx=0);var color_type=chart_type[color_idx];tpl.find(".main-box").attr("data-color",color_type),color_idx++,tpl=$compile(tpl)($scope),$("#watch-list").mixItUp("append",tpl,{filter:"all"})}}},function(){}),$http({url:http_addr+"/GM_Monitor/QueryMonitorInfoController/QuerMiddle.do?action=sqlRole&jsonp=JSON_CALLBACK",method:"JSONP"}).then(function(response){if(0==response.data.result){var zoneList=response.data.zoneCode;for(i=0;i<zoneList.length;i++){var tpl=$($(".tpl").html()).addClass("mix");tpl.find(".chart-box").attr("id",zoneList[i]),tpl.find(".main-box").attr("data-zone",zoneList[i]),i%2==0&&tpl.find(".main-box").attr("data-color","rgs"),tpl=$compile(tpl)($scope),$("#watch-list").mixItUp("append",tpl,{filter:"all"})}}},function(){}),$ele.find("ul").mixItUp({controls:{enable:!1},callbacks:{onMixStart:function(){$(".cd-fail-message").fadeOut(200)},onMixFail:function(){$(".cd-fail-message").fadeIn(200)}}})}}}]),app.directive("box",function(){return{restrict:"EA",scope:{},require:"^?boxList",controller:["$scope","$http",function($scope,$http){this.QuerMiddle=function(type){return $http({url:http_addr+"/GM_Monitor/QueryMonitorInfoController/QuerMiddle.do?action="+type+"&jsonp=JSON_CALLBACK",method:"JSONP"})},this.getWatch_type=function(){return $scope.watch_type},this.getRoleData=function(type,zoneCode){return $http({url:http_addr+"/GM_Monitor/QueryMonitorInfoController/QuerMiddle.do?action="+type+"&zoneCode="+zoneCode+"&jsonp=JSON_CALLBACK",method:"JSONP"})},this.builder={createChart:function(target_id,chartType,date,withTime,status,action_type,type){var chart_data=[];switch(parseInt(type)){case 3:$scope.watch_type="角色库监控"}for(i=0;i<date.length;i++)1==status[i]?item={xname:date[i]+"(异常点)",color:"#e54598",y:withTime[i]}:item={xname:date[i],y:withTime[i]},chart_data.push(item);if(chartType.indexOf("splineChart")>1){var inline_arr=chart_data;chart_data=[],chart_data.push(inline_arr)}for(chartname=["延迟(秒)"],x_name=[],j=0;j<date.length;j++)x_name[j]=date[j].substring(10,date[j].length-3);y_name="","area"==chartType?(chartEg=exampleAreaChart(chart_data,x_name,y_name,chartname,target_id),chartEg=areaChart(chart_data,x_name,y_name,chartname,target_id)):"bar"==chartType?chartEg=barChart(chart_data,x_name,y_name,chartname,target_id):"column"==chartType?chartEg=column2Chart(chart_data,x_name,y_name,chartname,target_id):"pieChart"==chartType?0!=x_name.length?chartEg=pieChart(chart_data,x_name,chartname,target_id):chartEg=pieChart(chart_data,chartname,x_name,target_id):"bluecolumnChart"==chartType?chartEg=bluecolumnChart(chart_data,x_name,y_name,chartname,target_id):"blueorangesplineChart"==chartType?chartEg=blueorangesplineChart(chart_data,x_name,y_name,chartname,target_id):"greencolumnChart"==chartType?chartEg=greencolumnChart(chart_data,x_name,y_name,chartname,target_id):"redgreensplineChart"==chartType&&(chartEg=redgreensplineChart(chart_data,x_name,y_name,chartname,target_id))}}}]}}),app.directive("chartBox",["$timeout","$interval",function($timeout,$interval){return{restrict:"A",scope:!0,require:"?^box",link:function(scope,iElement,iAttrs,pctrl){function getData(){var action_type=iAttrs.action;""!=action_type&&pctrl.QuerMiddle(action_type).then(function(response){if(0==response.data.result){var id=iElement.find(".chart-box").attr("id");iElement.find(".loading").css("display","none");var data=response.data;data=angular.fromJson(data);var max=data.withTime[0],max_idx=0;for(i=0;i<data.withTime.length;i++)max<data.withTime[i]&&(max=data.withTime[i],max_idx=i);scope.action_type=response.data.action_type;var max_timer=data.setDate[max_idx];scope.max_timer="最高延迟时间点:"+max_timer.substring(max_timer.indexOf("-")+1,max_timer.length-3),scope.max=max.toFixed(2);var colorChart="redgreensplineChart";"bos"==iAttrs.color?colorChart="blueorangesplineChart":"rgs"==iAttrs.color?colorChart="redgreensplineChart":"gc"==iAttrs.color?colorChart="greencolumnChart":"bc"==iAttrs.color&&(colorChart="bluecolumnChart"),pctrl.builder.createChart(id,colorChart,data.setDate,data.withTime,data.status,data.action_type,data.type),scope.watch_type=pctrl.getWatch_type()}else iElement.find(".error-msg").text(response.data.message),$timeout(function(){getData()},6e4)},function(response){iElement.find(".error-msg").text("连接不上服务器,请联系管理员")})}getData(),$interval(function(){getData()},12e5)}}}]),app.directive("roleBox",["$timeout","$interval",function($timeout,$interval){return{restrict:"A",scope:!0,require:"?^box",link:function(scope,iElement,iAttrs,pctrl){function getData(){var action_type=iAttrs.action,zoneCode=iAttrs.zone;zoneCode&&pctrl.getRoleData(action_type,zoneCode).then(function(response){if(0==response.data.result){var id=iElement.find(".chart-box").attr("id");iElement.find(".loading").css("display","none");var data=response.data;data=angular.fromJson(data);var max=data.withTime[0],max_idx=0;for(i=0;i<data.withTime.length;i++)max<data.withTime[i]&&(console.log(zoneCode+":"+data.withTime[i]),max=data.withTime[i],max_idx=i);scope.action_type=response.data.action_type,scope.zone_name="区服名："+response.data.zoneNme[0];var max_timer=data.setDate[max_idx];scope.max_timer="最高延迟时间点:"+max_timer.substring(max_timer.indexOf("-")+1,max_timer.length-3),scope.max=max.toFixed(2);var colorChart="redgreensplineChart";"bos"==iAttrs.color?colorChart="blueorangesplineChart":"rgs"==iAttrs.color?colorChart="redgreensplineChart":"gc"==iAttrs.color?colorChart="greencolumnChart":"bc"==iAttrs.color&&(colorChart="bluecolumnChart"),pctrl.builder.createChart(id,colorChart,data.setDate,data.withTime,data.status,data.action_type,data.type),scope.watch_type=pctrl.getWatch_type()}else iElement.find(".error-msg").text(response.data.message),$timeout(function(){getData()},6e4)},function(response){iElement.find(".error-msg").text("连接不上服务器,请联系管理员")})}getData(),$interval(function(){getData()},12e5)}}}]),app.directive("pieBox",["$interval","$timeout",function($interval,$timeout){return{restrict:"A",require:"?^box",scope:!0,link:function(scope,iElement,iAttrs,pctrl){function getData(){var id=iElement.find(".chart-box").attr("id");iElement.find(".loading").css("display","none"),pctrl.request().then(function(response){if(0==response.data.result){var data=angular.fromJson(response.data.data);pctrl.builder.buildChart(id,"pieChart",data.setDate,data.withTime,data.status,data.action_type,data.type)}},function(){iElement.find(".error-msg").text("连接不上服务器,请联系管理员")})}getData(),$interval(function(){getData()},12e5)}}}]),app.directive("loadingBox",["$timeout",function($timeout){return{restrict:"A",require:"?^box",scope:!0,link:function(scope,iElement,iAttrs,pctrl){$timeout(function(){iElement.find(".chart-box").attr("id");iElement.find(".loading").css("display","none"),iElement.find(".animation-bar").addClass("animation")},1e3)}}}])}();