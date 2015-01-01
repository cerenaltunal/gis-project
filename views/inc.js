$(function () {
 $.getJSON('inclination.json', function (inclinat) {
    $.getJSON('noise.json', function (smoothed) {	
    $('#container').highcharts('StockChart',{
        rangeSelector : {
		   inputDateFormat: '%d %H:%M',
           inputEditDateFormat: '%d %H:%M',
            // Custom parser to parse the %H:%M:%S.%L format
            inputDateParser: function (value) {
                value = value.split(/[ :\.]/);
                return Date.UTC(
                    1970,
                    0,
                    parseInt(value[0], 10),
                    parseInt(value[1], 10),
                    parseInt(value[2], 10),
                    0,
                    0
                );
            },
			
            allButtonsEnabled: true,
            selected : 1,
            buttons: [{
	type: 'minute',
	count: 30,
	text: '30m'
}, {
	type: 'hour',
	count: 1,
	text: '1h'
}, {
	type: 'hour',
	count: 12,
	text: '12h'
}, {
	type: 'day',
	count: 1,
	text: '1d'
},
 {
	type: 'week',
	count: 1,
	text: '1w'
},
 {
	type: 'all',
	text: 'All'
}]
        },
       
        
        title: {
            text: 'Inclination',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: Test',
            x: -20
        },
		xAxis: {
		text: 'Time'
//            categories: jsondata.map(function(elem){return elem['time'];})
        },
        yAxis: {
            title: {
                text: 'Inclination'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix:'C',
			valueDecimals: 2,
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
   series : [{
                name : 'inclination',
                data : inclinat.map(function(elem){return [Date.UTC(
                    1970,
                    0,
                    1,
                    0,
                    elem[0],
                    0,
                    0
                ), elem[1]];}),
                tooltip: {
                    valueDecimals: 2
                }
				},
				{
					name: 'smoothed',
					data: smoothed,
					tooltip: {
						valueDecimals: 2
					}
				}
				]

		
			});
		});
	});
});