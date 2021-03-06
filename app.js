(function(){
	/**
	 * @sola
	 */

	var express = require('express')
	  , morgan = require('morgan')
	  , fs = require('fs')
	  , path = require('path')
	  , multipart = require('connect-multiparty');

	var bodyParser = require('body-parser');

	var app = express();

	//new add 指定类型
	app.use(bodyParser.json());

	app.use(express.static('./public'));
	app.use(morgan('dev'));

	app.listen(process.env.PORT || 3000);
	console.log('sola running at: http://0.0.0.0:3000');
	
	/*app.post('/getData',multipart(),  function(req, res){

	  var type = req.body.type;

	  console.log(type);

	  //get filename
	  var filename = req.files.imgFile.originalFilename || path.basename(req.files.imgFile.ws.path);
	  //copy file to a public directory
	  var targetPath = path.dirname(__filename) + '/public/upload' + filename;
	  //copy file
	  fs.createReadStream(req.files.imgFile.ws.path).pipe(fs.createWriteStream(targetPath));
	  //return file url

	  var returnJson = {code: 200, msg: {url: 'http://' + req.headers.host + '/' + filename}};
	  res.json(returnJson);
	});*/
	app.get('/getZone',function(req,res){
		var type = req.body.type;
		var jsonp = req.body.jsonp;
		//console.log(jsonp);
		//var returnJson = {code: 200, data:{"chart_name":["line1","line2"],"y_name":"人数","x_name":["12/01","12/02","12/03","12/04","12/05","12/06","12/07","12/08","12/09","12/10","12/11","12/12","12/13","12/14","12/15","12/16","12/17","12/18","12/19","12/20"],"chart_data":[[1, 3, 4, 3, 3, 5, 4,3, 4, 3, 5, 4, 2, 6,3, 3, 5, 4,3, 4],[1, 3, 4, 3, 3, 5, 4,3, 4, 3, 5, 4, 2, 6,3, 3, 5, 4,3, 4]],"data_list":[["日期","设备","新增账户","新增设备"],["2015-01-01","11","0","21"],["2012-01-01","11","10","21"],["2018-01-01","1","0","2"]],"totalCount":100,"error_code":0,"error_message":""}};
		//var returnJson = {code: 200, data:{"chart_name":["line1","line2"],"y_name":"人数","x_name":["12/14","12/15","12/16","12/17","12/18","12/19","12/20"],"chart_data":[[{xname:"12/14",y:3}, {xname:"12/15",y:4}, {xname:"12/16",y:3}, {xname:"12/17",y:5},{xname:"12/18",y:4},{xname:"12/19",y:2},{xname:"12/20",y:6}],[{xname:"12/15",y:1}, {xname:"12/15",y:3}, {xname:"12/16",y:4}, {xname:"12/17",y:3},{xname:"12/18",y:3},{xname:"12/19",y:5},{xname:"12/20",y:4}]],"data_list":[["日期","设备","新增账户","新增设备"],["2015-01-01","11","0","21"],["2012-01-01","11","10","21"],["2018-01-01","1","0","2"]],"totalCount":100,"error_code":0,"error_message":""}};
		var returnJson = {code: 200, data:['z01','z02','z03','z04','z06']};
		
		for(j=0;j<returnJson.data.chart_name.length;j++){
			var arr = [];

			for(i=1;i<=type;i++){
				if(i==1){
					var x_name = [];
					if(i<10){
						x = "12/"+'0'+i;
					}
					returnJson.data.x_name.push(x);
				}
				
				x_name.push(x);
				var obj = {
					xname:x,
					y:Math.ceil(Math.random()*10)
				}
				arr.push(obj);
			}
			returnJson.data.chart_data.push(arr);
		}
		//console.log(returnJson.data.chart_data);
	    res.jsonp(returnJson);
	})

	app.post('/getData',multipart(),function(req,res){
		var type = req.body.type;
		var jsonp = req.body.jsonp;
		//console.log(jsonp);
		//var returnJson = {code: 200, data:{"chart_name":["line1","line2"],"y_name":"人数","x_name":["12/01","12/02","12/03","12/04","12/05","12/06","12/07","12/08","12/09","12/10","12/11","12/12","12/13","12/14","12/15","12/16","12/17","12/18","12/19","12/20"],"chart_data":[[1, 3, 4, 3, 3, 5, 4,3, 4, 3, 5, 4, 2, 6,3, 3, 5, 4,3, 4],[1, 3, 4, 3, 3, 5, 4,3, 4, 3, 5, 4, 2, 6,3, 3, 5, 4,3, 4]],"data_list":[["日期","设备","新增账户","新增设备"],["2015-01-01","11","0","21"],["2012-01-01","11","10","21"],["2018-01-01","1","0","2"]],"totalCount":100,"error_code":0,"error_message":""}};
		//var returnJson = {code: 200, data:{"chart_name":["line1","line2"],"y_name":"人数","x_name":["12/14","12/15","12/16","12/17","12/18","12/19","12/20"],"chart_data":[[{xname:"12/14",y:3}, {xname:"12/15",y:4}, {xname:"12/16",y:3}, {xname:"12/17",y:5},{xname:"12/18",y:4},{xname:"12/19",y:2},{xname:"12/20",y:6}],[{xname:"12/15",y:1}, {xname:"12/15",y:3}, {xname:"12/16",y:4}, {xname:"12/17",y:3},{xname:"12/18",y:3},{xname:"12/19",y:5},{xname:"12/20",y:4}]],"data_list":[["日期","设备","新增账户","新增设备"],["2015-01-01","11","0","21"],["2012-01-01","11","10","21"],["2018-01-01","1","0","2"]],"totalCount":100,"error_code":0,"error_message":""}};
		var returnJson = {code: 200, data:{"chart_name":["line1","line2"],"y_name":"人数","x_name":[],"chart_data":[],"error_code":0,"error_message":""}};
		
		for(j=0;j<returnJson.data.chart_name.length;j++){
			var arr = [];

			for(i=1;i<=type;i++){
				if(i==1){
					var x_name = [];
					if(i<10){
						x = "12/"+'0'+i;
					}
					returnJson.data.x_name.push(x);
				}
				
				x_name.push(x);
				var obj = {
					xname:x,
					y:Math.ceil(Math.random()*10)
				}
				arr.push(obj);
			}
			returnJson.data.chart_data.push(arr);
		}
		//console.log(returnJson.data.chart_data);
	    res.jsonp(returnJson);
	})
	app.get('/GM_Monitor/QueryMonitorInfoController/QuerMiddle.do',multipart(),function(req,res){
		var type = req.body.type;
		//var returnJson = {code: 200, data:{"chart_name":["line1","line2"],"y_name":"人数","x_name":["12/01","12/02","12/03","12/04","12/05","12/06","12/07","12/08","12/09","12/10","12/11","12/12","12/13","12/14","12/15","12/16","12/17","12/18","12/19","12/20"],"chart_data":[[1, 3, 4, 3, 3, 5, 4,3, 4, 3, 5, 4, 2, 6,3, 3, 5, 4,3, 4],[1, 3, 4, 3, 3, 5, 4,3, 4, 3, 5, 4, 2, 6,3, 3, 5, 4,3, 4]],"data_list":[["日期","设备","新增账户","新增设备"],["2015-01-01","11","0","21"],["2012-01-01","11","10","21"],["2018-01-01","1","0","2"]],"totalCount":100,"error_code":0,"error_message":""}};
		//var returnJson = {code: 200, data:{"chart_name":["line1","line2"],"y_name":"人数","x_name":["12/14","12/15","12/16","12/17","12/18","12/19","12/20"],"chart_data":[[{xname:"12/14",y:3}, {xname:"12/15",y:4}, {xname:"12/16",y:3}, {xname:"12/17",y:5},{xname:"12/18",y:4},{xname:"12/19",y:2},{xname:"12/20",y:6}],[{xname:"12/15",y:1}, {xname:"12/15",y:3}, {xname:"12/16",y:4}, {xname:"12/17",y:3},{xname:"12/18",y:3},{xname:"12/19",y:5},{xname:"12/20",y:4}]],"data_list":[["日期","设备","新增账户","新增设备"],["2015-01-01","11","0","21"],["2012-01-01","11","10","21"],["2018-01-01","1","0","2"]],"totalCount":100,"error_code":0,"error_message":""}};
		var returnJson = {code: 200, data:{"chart_name":["line1"],"y_name":"人数","x_name":[],"chart_data":[],"error_code":0,"error_message":""}};
		var returnJson = {"type":"1","action_type":"http","setDate":["2016-09-27 11:04:47","2016-09-27 11:05:48","2016-09-27 11:07:35","2016-09-27 11:08:48","2016-09-27 11:09:52","2016-09-27 11:10:52","2016-09-27 11:11:52","2016-09-27 11:12:53","2016-09-27 11:13:53","2016-09-27 11:14:53","2016-09-27 11:15:54","2016-09-27 11:16:54","2016-09-27 11:17:54","2016-09-27 11:18:55","2016-09-27 11:19:55","2016-09-27 11:20:55","2016-09-27 11:21:56","2016-09-27 11:22:56","2016-09-27 11:23:56"],"status":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"zone":[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],"zoneNme":[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],"withTime":[0,0,21,23,31,28,31,4,49,3,16,30,34,15,3,25,28,13,25],"result":"0"}
		
		var arr = [];

		for(i=1;i<=type;i++){
			if(i<10){
				x = "12/"+'0'+i;
			}else{
				x = "12/"+i;
			}
			returnJson.data.x_name.push(x);

			var obj = {
				xname:x,
				y:Math.ceil(Math.random()*10)
			}
			returnJson.data.chart_data.push(obj);
		}
		//console.log(returnJson.data.x_name);
	    //res.json(req.body.callback+'('+returnJson+')');
	    res.jsonp(returnJson);
	})

	app.post('/GM_Monitor/QueryMonitorInfoController/QuerMiddle.do',multipart(),function(req,res){
		var type = req.body.type;
		//var returnJson = {code: 200, data:{"chart_name":["line1","line2"],"y_name":"人数","x_name":["12/01","12/02","12/03","12/04","12/05","12/06","12/07","12/08","12/09","12/10","12/11","12/12","12/13","12/14","12/15","12/16","12/17","12/18","12/19","12/20"],"chart_data":[[1, 3, 4, 3, 3, 5, 4,3, 4, 3, 5, 4, 2, 6,3, 3, 5, 4,3, 4],[1, 3, 4, 3, 3, 5, 4,3, 4, 3, 5, 4, 2, 6,3, 3, 5, 4,3, 4]],"data_list":[["日期","设备","新增账户","新增设备"],["2015-01-01","11","0","21"],["2012-01-01","11","10","21"],["2018-01-01","1","0","2"]],"totalCount":100,"error_code":0,"error_message":""}};
		//var returnJson = {code: 200, data:{"chart_name":["line1","line2"],"y_name":"人数","x_name":["12/14","12/15","12/16","12/17","12/18","12/19","12/20"],"chart_data":[[{xname:"12/14",y:3}, {xname:"12/15",y:4}, {xname:"12/16",y:3}, {xname:"12/17",y:5},{xname:"12/18",y:4},{xname:"12/19",y:2},{xname:"12/20",y:6}],[{xname:"12/15",y:1}, {xname:"12/15",y:3}, {xname:"12/16",y:4}, {xname:"12/17",y:3},{xname:"12/18",y:3},{xname:"12/19",y:5},{xname:"12/20",y:4}]],"data_list":[["日期","设备","新增账户","新增设备"],["2015-01-01","11","0","21"],["2012-01-01","11","10","21"],["2018-01-01","1","0","2"]],"totalCount":100,"error_code":0,"error_message":""}};
		var returnJson = {code: 200, data:{"chart_name":["line1"],"y_name":"人数","x_name":[],"chart_data":[],"error_code":0,"error_message":""}};
		var returnJson = {"type":"1","action_type":"http","setDate":["2016-09-27 11:04:47","2016-09-27 11:05:48","2016-09-27 11:07:35","2016-09-27 11:08:48","2016-09-27 11:09:52","2016-09-27 11:10:52","2016-09-27 11:11:52","2016-09-27 11:12:53","2016-09-27 11:13:53","2016-09-27 11:14:53","2016-09-27 11:15:54","2016-09-27 11:16:54","2016-09-27 11:17:54","2016-09-27 11:18:55","2016-09-27 11:19:55","2016-09-27 11:20:55","2016-09-27 11:21:56","2016-09-27 11:22:56","2016-09-27 11:23:56"],"status":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"zone":[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],"zoneNme":[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],"withTime":[0,0,21,23,31,28,31,4,49,3,16,30,34,15,3,25,28,13,25],"result":"0"}
		
		var arr = [];

		for(i=1;i<=type;i++){
			if(i<10){
				x = "12/"+'0'+i;
			}else{
				x = "12/"+i;
			}
			returnJson.data.x_name.push(x);

			var obj = {
				xname:x,
				y:Math.ceil(Math.random()*10)
			}
			returnJson.data.chart_data.push(obj);
		}
		//console.log(returnJson.data.x_name);
	    //res.json(req.body.callback+'('+returnJson+')');
	    res.json(returnJson);
	})

	app.get('/env', function(req, res){
	  console.log("process.env.VCAP_SERVICES: ", process.env.VCAP_SERVICES);
	  console.log("process.env.DATABASE_URL: ", process.env.DATABASE_URL);
	  console.log("process.env.VCAP_APPLICATION: ", process.env.VCAP_APPLICATION);
	  res.json({
	    code: 200
	    , msg: {
	      VCAP_SERVICES: process.env.VCAP_SERVICES
	      , DATABASE_URL: process.env.DATABASE_URL
	    }
	  });
	});
})()