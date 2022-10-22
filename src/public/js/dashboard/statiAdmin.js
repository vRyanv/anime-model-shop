$(document).ready(function (){
    const appAdmin = {
        eventListener: function (){
            $('#btn_search_revenue_by_date').click(function (){
                let fromDate = $('#txt_from_date').val()
                let toDate = $('#txt_to_date').val()
                appAdmin.getRevenueByDate(fromDate, toDate)
            })
        },
        getRevenueByDate: function (fromDate,toDate){
            if(moment(fromDate, 'YYYY/MM/DD',true).isValid() && moment(toDate, 'YYYY/MM/DD',true).isValid()){
                $.ajax({
                    url: '/get-revenue-admin-by-date',
                    type: 'POST',
                    data: {date:true, fromDate, toDate},
                    beforeSend: appAdmin.animation(),
                    success: function (data){
                        if(data.status === 200){
                            appAdmin.revenueCalculation(data.revenue)
                        } else {
                            appAdmin.animation()
                            alert('something wrong! ' + data.mess)
                        }
                    },
                    error: function (){
                        appAdmin.animation()
                        alert('something wrong!')
                    }
                })
            } else {
                alert('Invalid date')
            }
        },
        getRevenueCurrentDate: function (){
                $.ajax({
                    url: '/get-revenue-admin-by-date',
                    type: 'POST',
                    beforeSend: appAdmin.animation(),
                    success: function (data){
                        if(data.status === 200){
                            appAdmin.revenueCalculation(data.revenue)
                            $('#shop_name').html('Shop: '+data.shopName)
                        } else {
                            appAdmin.animation()
                            alert('something wrong! ' + data.mess)
                        }
                    },
                    error: function (){
                        appAdmin.animation()
                        alert('something wrong!')
                    }
                })

        },
        revenueCalculation: function (revenue){
            if(revenue.length !== 0){
                let _revenue = 0
                for(let i = 0;i<revenue.length;i++){
                    _revenue += parseFloat(revenue[i].sum.substring(1))
                }
                $('#total_revenue').html('Total revenue: $'+_revenue)
            } else {
                $('#total_revenue').html('Total revenue: no income')
            }
            appAdmin.animation()
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
            appAdmin.eventListener()
            appAdmin.getRevenueCurrentDate()
        }
    }
    appAdmin.run()
})