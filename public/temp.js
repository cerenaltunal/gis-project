$(function () {
    //$.getJSON('http://localhost:3000/ch4', function (ch4) {
    $.getJSON('http://localhost:3000/ch3', function (ch3) {
        $.getJSON('http://localhost:3000/ch2', function (ch2) {
            $.getJSON('http://localhost:3000/ch1', function (ch1) {
                // Create the chart
                $('#container1').highcharts('StockChart', {


                    rangeSelector : {
                        allButtonsEnabled: true,
                        selected : 1,
                        buttons: [{
                            type: 'second',
                            count: 10,
                            text: '10s'
                        }, {
                            type: 'second',
                            count: 20,
                            text: '20s'
                        }, {
                            type: 'second',
                            count: 30,
                            text: '30s'
                        }, {
                            type: 'minute',
                            count: 1,
                            text: '1m'
                        },
                            {
                                type: 'all',
                                text: 'All'
                            }]

                    },

                    title : {
                        text : 'Node 383'
                    },
                    legend: {
                        enabled: true,
                        layout: 'horizontal'
                    },
                    series : [
                        {
                            name : 'ch1',
                            data : ch1,
                            tooltip: {
                                valueDecimals: 2
                            }
                        },
                        {
                            name : 'ch2',
                            data : ch2,
                            tooltip: {
                                valueDecimals: 2
                            }
                        },
                        {
                            name : 'ch3',
                            data : ch3,
                            tooltip: {
                                valueDecimals: 2
                            }
                        },
                        /* {
                         name : 'ch4',
                         data : ch4,
                         tooltip: {
                         valueDecimals: 2
                         }
                         } */
                    ]
                });
            });

        });
    });
});
//});