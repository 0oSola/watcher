
/*红绿色 曲线图*/
function redgreensplineChart(data,xName,yName,lineName,ele){

    var colorline2 = ["#22cc92","#e54598"];
    var chart = "";
    var seriesList = [];
    var errorColor = '#e54598';

    for(var i=0;i<data.length;i++){
        var item = {
            data:data[i],
            color:colorline2[i],
            name:lineName[i]
        }
        seriesList.push(item);
    }
    chart = new Highcharts.Chart({
        chart: {
            type: 'spline',
            renderTo:ele,
            //背景透明
            backgroundColor: 'rgba(0,0,0,0)'
            //backgroundColor:'#ffa734'
        },
        title: {
            text: ''
        },
        legend: {
            //隐藏 legend
            enabled: false,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 20,
            y: 0,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            //visible:false,
            //categories: xName,
            gridLineColor: '#eee',//纵向网格线颜色
            gridLineWidth: 1, //纵向网格线宽度
            minorGridLineColor: '#eee',//次级网格
            minorGridLineWidth: 1,
            minorTickLength: 0,
            minorGridLineDashStyle: 'longdash',
            minorTickInterval: 0.5,

            /*[
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ],*/
            /*plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .2)'
            }]*/
            labels: {
                visible:false,
                style: {
                    'color': 'black',
                    '-webkit-text-size-adjust':'none',
                    'font-size':'8px'
                }
            }
        },
        yAxis: {
            visible:false,
            title: {
                text:yName
            }
        },
        tooltip: {
            //enabled: false,
            //shared: true,
            useHTML: true,
            headerFormat: '<h3><span style="color:{point.color}">●</span>{series.name}</h3>',
            pointFormat: '<div>{point.xname}: ' +
                '<b>{point.y}</b></div>',
            footerFormat: '',
            valueSuffix: ' '
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: seriesList
    });
    return chart;
}


/*蓝橙色 曲线图*/
function blueorangesplineChart(data,xName,yName,lineName,ele){

    var colorline2 = ["#26bcf1","#fd694b"];
    var chart = "";
    var seriesList = [];

    for(var i=0;i<data.length;i++){
        var item = {
            data:data[i],
            color:colorline2[i],
            name:lineName[i]
        }
        seriesList.push(item);

    }
    chart = new Highcharts.Chart({
        chart: {
            type: 'spline',
            renderTo:ele,
            //背景透明
            backgroundColor: 'rgba(0,0,0,0)'
            //backgroundColor:'#ffa734'
        },
        title: {
            text: ''
        },
        legend: {
            //隐藏 legend
            enabled: false,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 20,
            y: 0,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            //visible:false,
            //categories: xName,
            gridLineColor: '#eee',//纵向网格线颜色
            gridLineWidth: 1, //纵向网格线宽度
            minorGridLineColor: '#eee',//次级网格
            minorGridLineWidth: 1,
            minorTickLength: 0,
            minorGridLineDashStyle: 'longdash',
            minorTickInterval: 0.5,

            /*[
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ],*/
            /*plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .2)'
            }]*/
            labels: {
                visible:false,
                style: {
                    'color': 'black',
                    '-webkit-text-size-adjust':'none',
                    'font-size':'8px'
                }
            }
        },
        yAxis: {
            visible:false,
            title: {
                text:yName
            }
        },
        tooltip: {
            //enabled: false,
            //shared: true,
            useHTML: true,
            headerFormat: '<h3><span style="color:{point.color}">●</span>{series.name}</h3>',
            pointFormat: '<div>{point.xname}: ' +
                '<b>{point.y}</b></div>',
            footerFormat: '',
            valueSuffix: ' '
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: seriesList
    });
    return chart;
}



/*
* 蓝色 column chart 柱状图
*/
function bluecolumnChart(data,xName,yName,lineName,ele){
    var chart = "";
    var seriesList = [];

       //item.animation=false;
       //item.showInLegend=false;
       var max = data[0].y;
       for(j=0;j<data.length;j++){
            if(max<data[j].y){
                max=data[j].y;
            }
       }
       var bgarr = [];
       for(p=0;p<data.length;p++){
          var obj = {
             xname:data[p].xname,
             y:max+5-data[p].y
          }
          bgarr.push(obj);
       }
       var bg = {
           data:bgarr,
           borderWidth: 0,
           color:'#f4f4f6',
           showInLegend:false,
           name:null
       }
       seriesList.push(bg);

    var item = {
        data:data,
        borderWidth: 0,
        color:'#25bcf1',
        name:lineName[0]
    }

    
    seriesList.push(item);
    chart = new Highcharts.Chart({
        chart: {
            type: 'column',
            renderTo:ele
        },
        title: {
            text: ''
        },
        xAxis: {
            /*visible:false,*/
            //gridLineColor: '#eee',//纵向网格线颜色
            //gridLineWidth: 1, //纵向网格线宽度
            tickInterval: 6,
            //lineColor : '#990000',//自定义刻度颜色
            tickWidth:0,
            categories: xName,
            title: {
                text: null
            },
            labels: {
                style: {
                    font: '10px',
                    color:'#999'
                }
            }
        },
        yAxis: {
            visible:false,
            min: 0,
            title: {
                text: yName,
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                formatter: function() {
                    return this.value + ' %';
                }
            }
        },
        tooltip: {
            shared:true,
            /*useHTML: true,
            headerFormat: '<h3><span style="color:{point.color}">●</span>{series.name}</h3>',
            pointFormat: '<div>{point.xname}: ' +
                '<b>{point.y}</b></div>',
            footerFormat: '',*/
            formatter: function() {
                return '<div style="border:1px solod '+this.points[1].color+'">'+
                '<h3><span style="color:'+this.points[1].color+'">●</span>'+this.points[1].point.xname+'</h3><br>'+
                ' <div>' +this.points[1].series.name+":"+ this.points[1].y +'</div></div>';
            },
            valueSuffix: ' '
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            },
            /*bar: {
                grouping: false,
                dataLabels: {
                    enabled: true
                }
            }*/
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -140,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: seriesList
    });
    return chart;
}

/*
* 绿色 column chart 柱状图
*/
function greencolumnChart(data,xName,yName,lineName,ele){
    var chart = "";
    var seriesList = [];

    //for(var i=0;i<data.length;i++){

    var item = {
        data:data,
        borderWidth: 0,
        color:'#00c380',
        name:lineName[0]
    }

    
    seriesList.push(item);
    //}

    chart = new Highcharts.Chart({
        chart: {
            type: 'column',
            renderTo:ele
        },
        title: {
            text: ''
        },
        xAxis: {
            /*visible:false,*/
            //gridLineColor: '#eee',//纵向网格线颜色
            //gridLineWidth: 1, //纵向网格线宽度
            tickInterval: 4,
            //lineColor : '#990000',//自定义刻度颜色
            tickWidth:0,
            categories: xName,
            title: {
                text: null
            },
            labels: {
                style: {
                    font: '10px',
                    color:'#999'
                }
            }

        },
        yAxis: {
            visible:false,
            min: 0,
            title: {
                text: yName,
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            shared:true,
            /*useHTML: true,
            headerFormat: '<h3><span style="color:{point.color}">●</span>{series.name}</h3>',
            pointFormat: '<div>{point.xname}: ' +
                '<b>{point.y}</b></div>',
            footerFormat: '',*/
            formatter: function() {
                return '<div style="border:1px solid '+this.points[0].color+'">'+
                '<h3><span style="color:'+this.points[0].color+'">●</span>'+this.points[0].point.xname+'</h3><br>'+
                ' <div>' +this.points[0].series.name+":"+ this.points[0].y +'</div></div>';
            },
            valueSuffix: ' '
        },
        plotOptions: {
            series: {  
                minPointLength: 2   //设置最小值
            }  
            /*column: {
                stacking: 'percent'
            },*/
            /*bar: {
                grouping: false,
                dataLabels: {
                    enabled: true
                }
            }*/
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -140,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: seriesList
    });
    return chart;
}


/*
* pie chart 饼图
*/
/*pie chart*/
function pieChart(data,nameList,dataName,ele){
    var chart = "";
    var datalist = [];
    var total = 0;
    var colorline = ["#3f51b5","#fd694b","#26bcf1"];
    //data[0].length
    for(var i=0;i<3;i++){
        total = total + parseInt(data[0][i].y);
    }
    for(var i=0;i<3;i++){
        datarow = {
            color:colorline[i],
            name:nameList[i],
            y:parseInt(data[0][i].y)/total
        };
        datalist.push(datarow);
    }
    
    chart = new Highcharts.Chart({
        chart: {
            renderTo:ele,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        legend:{
            enabled:false
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: dataName,
            colorByPoint: true,
            data: datalist
        }],
        credits: {  
          enabled: false  
        }
    });
    return chart;
}
