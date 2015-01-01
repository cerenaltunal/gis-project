var express = require('express')
path = require('path');
var app = express()
var TimeSeries = require("timeseries-analysis");
	fs = require('fs');

var pg = require('pg');
var router = express.Router();
var conOptions = {

    "user": "timeseries",
    "password": "timeseries",
    "host":"localhost",
    "port": 5432,
    "database": "timeseries",
    "poolSize": 10,
    "poolIdleTimeout": 30000 // 30 seconds
};


//or native libpq bindings
//var pg = require('pg').native
var conString = "postgres://timeseries:timeseries@localhost/timeseries";
var time=[];
//var client = new pg.Client(conOptions);
var rowdata = [{
".timestampgmt":"13/05/2014 07:56:48.006750000",
"Tick":"1",
"Node 383-ch1(G)[4 Hz]":"0.01443284005",
"Node 383-ch2(G)[4 Hz]	":"0.01443284005",
"Node 383-ch3(G)[4 Hz]	":"0.01443284005",
"Node 383-ch4(ｰC)[4 Hz]":"0.01443284005",
"Node 383-Node RSSI(dBm)[4 Hz]":"0.01443284005",
"Node 383-Base RSSI(dBm)[4 Hz]":"0.01443284005",
"Node 384-ch1(G)[4 Hz]	":"0.01443284005",
"Node 384-ch2(G)[4 Hz]	":"0.01443284005",
"Node 384-ch3(G)[4 Hz]	":"0.01443284005",
"Node 384-ch4(ｰC)[4 Hz]":"0.01443284005",
"Node 384-Node RSSI(dBm)[4 Hz]":"0.01443284005",
"Node 384-Base RSSI(dBm)[4 Hz]":"0.01443284005",
"Node 573-ch1(ｵStrain)[1 sample per 10 sec]":"0.01443284005",
"Node 573-ch2(ｵStrain)[1 sample per 10 sec]":"0.01443284005",
"Node 573-ch3(ｵStrain)[1 sample per 10 sec]":"0.01443284005",
"Node 573-ch8(ｰC)[1 sample per 10 sec]":"0.01443284005",
"Node 573-Node RSSI(dBm)[1 sample per 10 sec]":"0.01443284005",
"Node 573-Base RSSI(dBm)[1 sample per 10 sec]":"0.01443284005",
"Node 574-ch1(ｵStrain)[1 sample per 10 sec]":"0.01443284005",
"Node 574-ch2(ｵStrain)[1 sample per 10 sec]":"0.01443284005",	
"Node 574-ch8(ｰC)[1 sample per 10 sec]":"0.01443284005",	
"Node 574-Node RSSI(dBm)[1 sample per 10 sec]":"0.01443284005",
"Node 574-Base RSSI(dBm)[1 sample per 10 sec]":"0.01443284005"
}];


//add some standard express middleware

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/ch1', function(req, res){

    pg.connect(conOptions, function(err, client, done){

  if(err) {
    return console.error('could not connect to postgres', err);
  }
	client.query('SELECT timestampgmt, node383ch1 from inclination  where node383ch1 is not NULL order by timestampgmt Limit 500', function(err, result) {
	console.log("starting query");
    
	if(err) {
      return console.error('error running query', err);
    }
	
	dataset1="Node383-ch1(G)[4 Hz]";
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
	
		 var mydata=Object.keys(result.rows).map(function(key) {
						return  [ this[key].timestampgmt , this[key]. node383ch1];
						}, result.rows);
	 var a=mydata;
		 var mydata= a.map(function(elem){return [(new Date(elem[0])).getTime(), Number(elem[1])];
			});
	//res.json(result.rows);
	
	//Smoothing
	

	var ts = new TimeSeries.main(mydata);

	var mav=ts.ma({period : 12});
	var noise=ts.smoother({period:12}).noiseData();
		

	
	console.log("finished query");

res.send(JSON.stringify(mydata));
done();
  });
});
});


app.get('/ch2', function(req, res){  
pg.connect(conOptions, function(err, client, done){
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT timestampgmt, node383ch2 from inclination where node383ch2 is not NULL    order by timestampgmt Limit 500', function(err, result) {
	console.log("starting query");
    if(err) {
      return console.error('error running query', err);
    }
	
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
	
		 var mydata=Object.keys(result.rows).map(function(key) {
						return  [ this[key].timestampgmt , this[key]. node383ch2];
						}, result.rows);
	 var a=mydata;
		 var mydata= a.map(function(elem){return [(new Date(elem[0])).getTime(), Number(elem[1])];
			});
	//res.json(result.rows);
	
	console.log("sd query there");

res.send(JSON.stringify(mydata));
done();
  });
});
});

app.get('/ch3', function(req, res){  
pg.connect(conOptions, function(err, client, done){
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT timestampgmt, node383ch3 from inclination where node383ch3 is not NULL  order by timestampgmt Limit 500', function(err, result) {
	console.log("starting query");
    if(err) {
      return console.error('error running query', err);
    }
	
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
	
		 var mydata=Object.keys(result.rows).map(function(key) {
						return  [ this[key].timestampgmt , this[key]. node383ch3];
						}, result.rows);
	 var a=mydata;
		 var mydata= a.map(function(elem){return [(new Date(elem[0])).getTime(), Number(elem[1])];
			});
	//res.json(result.rows);
	
	console.log("finished query");

res.send(JSON.stringify(mydata));
done();
  });
});
});

app.get('/ch4', function(req, res){  
pg.connect(conOptions, function(err, client, done){
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT timestampgmt, node383ch4 from inclination where node383ch4 is not NULL  order by timestampgmt Limit 500  ', function(err, result) {
	console.log("starting query");
    if(err) {
      return console.error('error running query', err);
    }
	
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
	
		 var mydata=Object.keys(result.rows).map(function(key) {
						return  [ this[key].timestampgmt , this[key]. node383ch4];
						}, result.rows);
	 var a=mydata;
		 var mydata= a.map(function(elem){return [(new Date(elem[0])).getTime(), Number(elem[1])];
			});
	//res.json(result.rows);
	
	console.log("finished query");

res.send(JSON.stringify(mydata));
done();
  });
});
});


app.get('/sd', function(req, res){  
pg.connect(conOptions, function(err, client, done){
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT timestampgmt, node383ch3 from inclination where node383ch3 is not NULL  order by timestampgmt Limit 500', function(err, result) {
	console.log("starting query");
    if(err) {
      return console.error('error running query', err);
    }
	
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
	
		 var mydata=Object.keys(result.rows).map(function(key) {
						return   this[key]. node383ch3;
						}, result.rows);

	//res.json(result.rows);
	//var sd=mydata.mean();
	console.log("finished query");
var ts = new TimeSeries.main(mydata);
var sd=ts.max();
res.send(JSON.stringify(sd));
done();
  });
});
});

app.get('/', function (req, res) {
res.render('index');
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})

//setup our app to use handlebars.js for templating
//setup our app to use handlebars.js for templating
