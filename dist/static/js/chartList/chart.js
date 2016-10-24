function mapChart(ele,jsonData){$.get("../static/js/echart/json/china.json",function(geoJson){echarts.registerMap("china",geoJson);var myChart=echarts.init(document.getElementById(ele));myChart.setOption(option={title:{text:jsonData.title,subtext:"",left:"center"},tooltip:{trigger:"item"},legend:{orient:"vertical",left:"left"},visualMap:{min:0,max:jsonData.maxValue,left:"left",top:"bottom",calculable:!0},toolbox:{show:!0,orient:"vertical",left:"right",top:"center",feature:{dataView:{readOnly:!1},restore:{},saveAsImage:{}}},series:[{name:jsonData.title,type:"map",mapType:"china",itemStyle:{normal:{label:{show:!0}},emphasis:{label:{show:!0}}},data:jsonData.data}]})})}function column2Chart(data,xName,yName,lineName,ele){for(var chart="",seriesList=[],i=0;i<data.length;i++){var item={data:data[i],color:colorLine2[i],name:lineName[i]};seriesList.push(item)}return chart=new Highcharts.Chart({chart:{type:"column",renderTo:ele},title:{text:""},xAxis:{categories:xName,title:{text:null}},yAxis:{min:0,title:{text:yName,align:"high"},labels:{overflow:"justify"}},tooltip:{valueSuffix:""},plotOptions:{bar:{dataLabels:{enabled:!0}}},legend:{layout:"vertical",align:"right",verticalAlign:"top",x:-140,y:80,floating:!0,borderWidth:1,backgroundColor:Highcharts.theme&&Highcharts.theme.legendBackgroundColor||"#FFFFFF",shadow:!0},credits:{enabled:!1},series:seriesList})}function barChart(data,xName,yName,lineName,ele){for(var chart="",seriesList=[],i=0;i<data.length;i++){var item={data:data[i],color:colorLine2[i],name:lineName[i]};seriesList.push(item)}return chart=new Highcharts.Chart({chart:{type:"bar",renderTo:ele},title:{text:""},xAxis:{categories:xName,title:{text:null}},yAxis:{min:0,title:{text:yName,align:"high"},labels:{overflow:"justify"}},tooltip:{valueSuffix:""},plotOptions:{bar:{dataLabels:{enabled:!0}}},legend:{layout:"vertical",align:"right",verticalAlign:"top",x:-140,y:80,floating:!0,borderWidth:1,backgroundColor:Highcharts.theme&&Highcharts.theme.legendBackgroundColor||"#FFFFFF",shadow:!0},credits:{enabled:!1},series:seriesList})}function areaChart(data,xName,yName,lineName,ele){for(var chart="",seriesList=[],i=0;i<data.length;i++){var item={data:data[i],color:colorLine2[i],name:lineName[i]};seriesList.push(item)}return chart=new Highcharts.Chart({chart:{type:"areaspline",renderTo:ele,backgroundColor:"rgba(0,0,0,0)"},title:{text:""},legend:{layout:"vertical",align:"left",verticalAlign:"top",x:20,y:0,floating:!0,borderWidth:1,backgroundColor:Highcharts.theme&&Highcharts.theme.legendBackgroundColor||"#FFFFFF"},xAxis:{visible:!1,categories:xName,labels:{style:{color:"black","-webkit-text-size-adjust":"none","font-size":"8px"}}},yAxis:{title:{text:""}},tooltip:{shared:!0,valueSuffix:" "},credits:{enabled:!1},plotOptions:{areaspline:{fillOpacity:.5}},series:seriesList})}function scatterChart(datax,datay,x_name,y_name,nameList,ele){for(var dataseries=[],i=0;i<datax.length;i++){var xy_arr=[];xy_arr.push(parseInt(datax[i])),xy_arr.push(parseInt(datay[i])),dataseries.push(xy_arr)}var seriesItem={name:nameList[0],color:colorLine[0],data:dataseries};return chart=new Highcharts.Chart({chart:{renderTo:ele,type:"scatter",zoomType:"xy"},title:{text:"scatter chart"},xAxis:{title:{enabled:!0,text:x_name},startOnTick:!0,endOnTick:!0,showLastLabel:!0},yAxis:{title:{text:y_name}},legend:{layout:"vertical",align:"left",verticalAlign:"top",x:100,y:70,floating:!0,backgroundColor:Highcharts.theme&&Highcharts.theme.legendBackgroundColor||"#FFFFFF",borderWidth:1},plotOptions:{scatter:{marker:{radius:5,states:{hover:{enabled:!0,lineColor:"rgb(100,100,100)"}}},states:{hover:{marker:{enabled:!1}}},tooltip:{headerFormat:"<b>{series.name}</b><br>",pointFormat:"{point.x}, {point.y}"}}},series:[seriesItem],credits:{enabled:!1}}),chart}function pieChart(data,nameList,dataName,ele){for(var chart="",datalist=[],total=0,i=0;i<data[0].length;i++)total+=parseInt(data[0][i]);for(var i=0;i<data[0].length;i++)datarow={color:colorLine2[i],name:nameList[i],y:parseInt(data[0][i])/total},datalist.push(datarow);return chart=new Highcharts.Chart({chart:{renderTo:ele,plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,type:"pie"},title:{text:""},tooltip:{pointFormat:"{series.name}: <b>{point.percentage:.1f}%</b>"},plotOptions:{pie:{allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!1},showInLegend:!0}},series:[{name:dataName,colorByPoint:!0,data:datalist}],credits:{enabled:!1}})}function colcumChart(nameList,x_categorties,xName,yName,data,ele){for(var chart="",dataList=[],i=0;i<data.length;i++){var datarow={name:nameList[i],color:colorLine[i],data:data[i]};dataList.push(datarow)}return chart=new Highcharts.Chart({chart:{renderTo:ele,type:"column"},title:{text:"colcum"},tooltip:{formatter:function(){return""+this.series.name+":"+x_categorties[this.x]+","+Highcharts.numberFormat(this.y,2,".")}},xAxis:{labels:{formatter:function(){return x_categorties[this.value]}},title:{text:xName},gridLineWidth:2,gridLineColor:"#ccc"},yAxis:{min:0,minPadding:.2,maxPadding:.2,endOnTick:!1,startOnTick:!1,title:{text:yName,align:"high",rotation:0,y:10},plotLines:[{value:0,width:1,color:"#808080"}],offset:-5,lineWidth:2,lineColor:"#333",gridLineWidth:1,gridLineColor:"#ccc",stackLabels:{enabled:!0,style:{fontWeight:"bold",color:Highcharts.theme&&Highcharts.theme.textColor||"gray"}}},legend:{align:"right",x:-30,verticalAlign:"top",y:25,floating:!0,backgroundColor:Highcharts.theme&&Highcharts.theme.background2||"white",borderColor:"#CCC",borderWidth:1,shadow:!1},plotOptions:{column:{stacking:"normal",dataLabels:{enabled:!0,color:Highcharts.theme&&Highcharts.theme.dataLabelsColor||"white",style:{textShadow:"0 0 3px black"}}}},series:dataList,credits:{enabled:!1}})}function linechart(xName,yName,nameList,x_categorties,data,ele){for(var chart="",dataList=[],i=0;i<data.length;i++){var datarow={name:nameList[i],color:colorLine[i],data:data[i]};dataList.push(datarow)}return chart=new Highcharts.Chart({chart:{renderTo:ele,type:"spline"},title:{text:"line",x:20},legend:{align:"right",x:-30,verticalAlign:"top",y:25,floating:!0,backgroundColor:Highcharts.theme&&Highcharts.theme.background2||"white",borderColor:"#CCC",borderWidth:1,shadow:!1},tooltip:{formatter:function(){return""+this.series.name+":"+x_categorties[this.x]+","+Highcharts.numberFormat(this.y,2,".")}},xAxis:{title:{text:xName},labels:{formatter:function(){return x_categorties[this.value]}},gridLineWidth:2,gridLineColor:"#ccc"},yAxis:{min:0,minPadding:.2,maxPadding:.2,endOnTick:!1,startOnTick:!1,title:{text:yName,align:"high",rotation:0,y:10},plotLines:[{value:0,width:1,color:"#808080"}],offset:0,lineWidth:1,lineColor:"#333",gridLineWidth:1,gridLineColor:"#ccc"},series:dataList,credits:{enabled:!1}})}var colorLine=["#3182bd","#6baed6","#9ecae1","#c6dbef","#e6550d","#fd8d3c","#fdae6b","#fdd0a2","#31a354","#74c476","#a1d99b","#c7e9c0","#756bb1","#9e9ac8","#bcbddc","#dadaeb","#636363","#969696","#bdbdbd","#d9d9d9"],colorLine2=["#14ADC4","#7cb5ec","#e55555","#3182bd","#6baed6","#9ecae1","#c6dbef","#e6550d","#fd8d3c","#fdae6b","#fdd0a2","#31a354","#74c476","#a1d99b","#c7e9c0","#756bb1","#9e9ac8","#bcbddc","#dadaeb","#636363","#969696","#bdbdbd","#d9d9d9"],colorLine3=["#cf2257","#fea643","#2ca4a8","#435a74"],colorLine4=["#ffb312","#ef6c3d","#c4a276","#4c4743","#44c5c4"],white=["#fff","#fff"];