$(document).ready(function (){
    const appSA = {
        variables: {
            canvasChart: $('#shop_chart')[0].getContext('2d'),
            revenueShopChart: null
        },
        eventListener: function (){
            $('#btn_search_revenue_by_date').click(function (){
                let fromDate = $('#txt_from_date').val()
                let toDate = $('#txt_to_date').val()
                appSA.getRevenueByDate(fromDate, toDate)
            })
        },
        getRevenueByDate: function (fromDate, toDate){
            if(moment(fromDate, 'YYYY/MM/DD',true).isValid() && moment(toDate, 'YYYY/MM/DD',true).isValid()){
                $.ajax({
                    url: '/supper-admin/get-revenue-all-shop-by-date',
                    type: 'POST',
                    data: {date:true, fromDate, toDate},
                    beforeSend: appSA.animation(),
                    success: function (data){
                        if(data.status === 200){
                            appSA.revenueCalculation(data.revenue, data.shops)
                        } else {
                            appSA.animation()
                            alert('something wrong! ' + data.mess)
                        }
                    },
                    error: function (){
                        appSA.animation()
                        alert('something wrong!')
                    }
                })
            } else {
                alert('Invalid date')
            }
        },
        getRevenueAllShop: function (){
            $.ajax({
                url:'/supper-admin/get-revenue-all-shop',
                type: 'GET',
                beforeSend: appSA.animation(),
                success: function (data){
                    if(data.status === 200){
                        appSA.revenueCalculation(data.revenue, data.shops)
                    } else {
                        alert('something wrong!')
                    }
                },
                error: function (){
                    appSA.animation()
                    alert('Server: something wrong!')
                }
            })
        },
        renderDataChart: function (shopName, shopRevenue){
            let totalRevenue = 0
            for (const value of shopRevenue){
                totalRevenue += value
            }
            appSA.variables.revenueShopChart.config._config.data.labels = shopName
            appSA.variables.revenueShopChart.config._config.data.datasets[0].data = shopRevenue
            appSA.variables.revenueShopChart.update()
            $('#total_revenue').html('Total revenue: $' +totalRevenue)
            appSA.animation()
        },
        revenueCalculation: function (revenue, shops){
            console.log(revenue)
            console.log(shops)
            for (let i=0;i<shops.length;i++){
                shops[i].revenue = 0
            }
            for (let i=0;i<revenue.length;i++){
                for (let j=0;j<shops.length;j++){
                    if(revenue[i].shop_name === shops[j].shop_name){
                        shops[j].revenue += parseFloat(revenue[i].price.substring(1))
                    }
                }
            }
            var shopName = []
            var shopRevenue = []
            for (let i=0;i<shops.length;i++){
                shopName[i] = shops[i].shop_name
                shopRevenue[i] = shops[i].revenue
            }

            appSA.renderDataChart(shopName, shopRevenue)
        },
        createBlankChart: function (){
            appSA.variables.revenueShopChart = new Chart(
                appSA.variables.canvasChart
                , {
                type: 'bar',
                data: {
                    labels: null,
                    datasets: [{
                        label: 'Revenue',
                        data: null,
                        backgroundColor: [
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }
            );
        },
        animation: function (){
            if($('.canvas-animation').css('display') == 'none')
            {
                $('.canvas-animation').css('display', 'flex')
            }
            else
            {
                $('.canvas-animation').css('display', 'none')
            }
        },
        run: function (){
            appSA.createBlankChart()
            appSA.getRevenueAllShop()
            appSA.eventListener()
        }
    }
    appSA.run()
})