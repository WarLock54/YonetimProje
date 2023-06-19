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
            var myChart = ec.init(document.getElementById('basic-pie-2'));

            // Chart Options
            // ------------------------------
            var NumberOfParticipants = $('#AnkCevapsCount').val();
            var IntCountTotalParticipants = parseInt(NumberOfParticipants);

            var NumberOfAnswers = $('#AnswersCount').val();

            if (NumberOfAnswers == "2") {
                var OptionA = $('#OptionA').val();
                var OptionB = $('#OptionB').val();

                var OptionACount = parseInt($('#OptionACount').val());
                var OptionBCount = parseInt($('#OptionBCount').val());

                var DataOfSeries = [{ value: OptionACount, name: OptionA }, { value: OptionBCount, name: OptionB }];
                var DataOfLegend = [OptionA, OptionB];

            } else if (NumberOfAnswers == "4") {
                var OptionA = $('#OptionA').val();
                var OptionB = $('#OptionB').val();
                var OptionC = $('#OptionC').val();
                var OptionD = $('#OptionD').val();

                var OptionACount = parseInt($('#OptionACount').val());
                var OptionBCount = parseInt($('#OptionBCount').val());
                var OptionCCount = parseInt($('#OptionCCount').val());
                var OptionDCount = parseInt($('#OptionDCount').val());

                var DataOfSeries = [{ value: OptionACount, name: OptionA }, { value: OptionBCount, name: OptionB }, { value: OptionCCount, name: OptionC }, { value: OptionDCount, name: OptionD }];
                var DataOfLegend = [OptionA, OptionB, OptionC, OptionD];
            } else if (NumberOfAnswers == "6") {
                var OptionA = $('#OptionA').val();
                var OptionB = $('#OptionB').val();
                var OptionC = $('#OptionC').val();
                var OptionD = $('#OptionD').val();
                var OptionE = $('#OptionE').val();
                var OptionF = $('#OptionF').val();

                var OptionACount = parseInt($('#OptionACount').val());
                var OptionBCount = parseInt($('#OptionBCount').val());
                var OptionCCount = parseInt($('#OptionCCount').val());
                var OptionDCount = parseInt($('#OptionDCount').val());
                var OptionECount = parseInt($('#OptionECount').val());
                var OptionFCount = parseInt($('#OptionFCount').val());

                var DataOfSeries = [{ value: OptionACount, name: OptionA }, { value: OptionBCount, name: OptionB }, { value: OptionCCount, name: OptionC }, { value: OptionDCount, name: OptionD }, { value: OptionECount, name: OptionE }, { value: OptionFCount, name: OptionF }];
                var DataOfLegend = [OptionA, OptionB, OptionC, OptionD, OptionE, OptionF];
            }
            

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
                    data:DataOfLegend
                },

                // Add custom colors
                color: ['#16D39A', '#FF4558', '#239de8', '#fde2a1', '#ff66ff','#ff6600'],

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
                    data: DataOfSeries
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