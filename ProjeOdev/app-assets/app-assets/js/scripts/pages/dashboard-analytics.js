/*=========================================================================================
    File Name: dashboard-analytics.js
    Description: intialize advance cards
    ----------------------------------------------------------------------------------------
    Item Name: Stack - Responsive Admin Theme
    Version: 3.0
    Author: Pixinvent
    Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/
(function (window, document, $) {
    'use strict';

    //$('#audience-list-scroll, #goal-list-scroll').perfectScrollbar({
    //    wheelPropagation: true
    //});

    $("#sp-bar-total-cost").sparkline([5, 6, 7, 8, 9, 10, 13, 15, 13, 12, 10, 9, 10, 12, 15, 18, 16, 14, 12, 10, 8, 5], {
        type: 'bar',
        width: '100%',
        height: '30px',
        barWidth: 4,
        barSpacing: 6,
        barColor: '#FFA87D'
    });

    $("#sp-stacked-bar-total-sales").sparkline([5, 6, 7, 8, 9, 10, 13, 15, 13, 12, 10, 9, 10, 12, 15, 18, 16, 14, 12, 10, 8, 5], {
        type: 'bar',
        width: '100%',
        height: '30px',
        barWidth: 4,
        barSpacing: 6,
        barColor: '#FF7588'
    });

    $("#sp-tristate-bar-total-revenue").sparkline([5, 6, 7, 8, 9, 10, 13, 15, 13, 12, 10, 9, 10, 12, 15, 18, 16, 14, 12, 10, 8, 5], {
        type: 'bar',
        width: '100%',
        height: '30px',
        barWidth: 4,
        barSpacing: 6,
        barColor: '#16D39A'
    });

    /***********************************************************
    *               New User - Page Visist Stats               *
    ***********************************************************/
    //Get the context of the Chart canvas element we want to select
    var ctx2 = document.getElementById("line-stacked-area").getContext("2d");

    // Chart Options
    var userPageVisitOptions = {
        responsive: true,
        maintainAspectRatio: false,
        pointDotStrokeWidth: 4,
        legend: {
            display: false,
            labels: {
                fontColor: '#404e67',
                boxWidth: 10,
            },
            position: 'bottom',
        },
        hover: {
            mode: 'label'
        },
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    color: "rgba(255,255,255, 0.3)",
                    drawTicks: true,
                    drawBorder: false,
                    zeroLineColor: '#FFF'
                },
                ticks: {
                    display: true,
                },
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    color: "rgba(0,0,0, 0.07)",
                    drawTicks: false,
                    drawBorder: false,
                    drawOnChartArea: true
                },
                ticks: {
                    display: true,
                    maxTicksLimit: 5
                },
            }]
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart - Legend'
        },
    };

    var JanVisits = parseInt($('#JanVisits').val());
    var FebVisits = parseInt($('#FebVisits').val());
    var MarVisits = parseInt($('#MarVisits').val());
    var AprVisits = parseInt($('#AprVisits').val());
    var MayVisits = parseInt($('#MayVisits').val());
    var JunVisits = parseInt($('#JunVisits').val());
    var JulVisits = parseInt($('#JulVisits').val());
    var AugVisits = parseInt($('#AugVisits').val());
    var SepVisits = parseInt($('#SepVisits').val());
    var OctVisits = parseInt($('#OctVisits').val());
    var NovVisits = parseInt($('#NovVisits').val());
    var DecVisits = parseInt($('#DecVisits').val());

    // Chart Data
    var userPageVisitData = {
        labels: ["Oca", "Sub", "Mar", "Nis", "May", "Haz", "Tem", "Agu", "Eyl", "Eki", "Kas", "Ara"],
        datasets: [{
            label: "Toplam Ziyaret",
            data: [JanVisits, FebVisits, MarVisits, AprVisits, MayVisits, JunVisits, JulVisits, AugVisits, SepVisits, OctVisits, NovVisits, DecVisits],
            backgroundColor: "rgba(255,117,136, 0.7)",
            borderColor: "transparent",
            pointBorderColor: "transparent",
            pointBackgroundColor: "transparent",
            pointRadius: 2,
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2,
        }
    ]
    };

    var userPageVisitConfig = {
        type: 'line',
        // Chart Options
        options: userPageVisitOptions,
        // Chart Data
        data: userPageVisitData
    };

    // Create the chart
    var stackedAreaChart = new Chart(ctx2, userPageVisitConfig);

})(window, document, jQuery);