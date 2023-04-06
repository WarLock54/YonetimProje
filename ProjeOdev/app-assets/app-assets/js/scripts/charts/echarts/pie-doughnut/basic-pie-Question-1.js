/*=========================================================================================
    File Name: basic-pie.js
    Description: echarts basic pie chart
    ----------------------------------------------------------------------------------------
    Item Name: Stack - Responsive Admin Theme
    Version: 3.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Basic pie chart
// ------------------------------

$(window).on("load", function(){

    // Set paths
    // ------------------------------

    require.config({
        paths: {
            echarts: '../../../app-assets/vendors/js/charts/echarts'
        }
    });


    // Configuration
    // ------------------------------

    require(
        [
            'echarts',
            'echarts/chart/pie',
            'echarts/chart/funnel'
        ],


        // Charts setup
        function (ec) {
            // Initialize chart
            // ------------------------------
            var myChart = ec.init(document.getElementById('basic-pie-1'));

            // Chart Options
            // ------------------------------
            var NumberOfParticipants = $('#AnkCevapsCount').val();
            var IntCountTotalParticipants = parseInt(NumberOfParticipants);

            var AnkCevapsEvetCount = parseInt($('#AnkCevapsEvetCount').val());
            var AnkCevapsHayirCount = parseInt($('#AnkCevapsHayirCount').val());
            chartOptions = {

                // Add title
                title: {
                    text: 'Toplam Katılım',
                    subtext: NumberOfParticipants,
                    x: 'center'
                },

                // Add tooltip
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },

                // Add legend
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['Evet', 'Hayır']
                },

                // Add custom colors
                color: ['#16D39A', '#FF4558'],

                // Display toolbox
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    feature: {
                        mark: {
                            show: true,
                            title: {
                                mark: 'Markline değiştir',
                                markUndo: 'Geri markline',
                                markClear: 'Temizle markline'
                            }
                        },
                        dataView: {
                            show: true,
                            readOnly: false,
                            title: 'Data Göster',
                            lang: ['Grafik verilerini görüntüle', 'Kapat', 'Güncelle']
                        },
                        magicType: {
                            show: true,
                            title: {
                                pie: 'Pasta',
                                funnel: 'Huni',
                            },
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    y: '20%',
                                    width: '50%',
                                    height: '70%',
                                    funnelAlign: 'left',
                                    max: IntCountTotalParticipants
                                }
                            }
                        },
                        restore: {
                            show: true,
                            title: 'Yenile'
                        },
                        saveAsImage: {
                            show: true,
                            title: 'Resim kaydet',
                            lang: ['Kaydet']
                        }
                    }
                },

                // Enable drag recalculate
                calculable: true,


                

                // Add series
                series: [{
                    name: 'Cevap',
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '57.5%'],
                    data: [
                        { value: AnkCevapsEvetCount, name: 'Evet'},
                        { value: AnkCevapsHayirCount, name: 'Hayır'},
                    ]
                }]
            };

            // Apply options
            // ------------------------------

            myChart.setOption(chartOptions);


            // Resize chart
            // ------------------------------

            $(function () {

                // Resize chart on menu width change and window resize
                $(window).on('resize', resize);
                $(".menu-toggle").on('click', resize);

                // Resize function
                function resize() {
                    setTimeout(function() {

                        // Resize chart
                        myChart.resize();
                    }, 200);
                }
            });
        }
    );
});