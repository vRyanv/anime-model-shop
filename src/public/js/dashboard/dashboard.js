$('body').append('<div class="loading">\n' +
    '    <div class="dot"></div>\n' +
    '    <div class="dot2"></div>\n' +
    '</div>');

$(document).ready(function (){

    setTimeout(function (){
        $('.loading').remove()
        $('body').css('background-color', 'rgb(246, 246, 246)')
        $('#root_admin').show()
    }, 500)
    const controller = $('.controller-in-dashboard')
    const rootDashboard = $('#root_dashboard')
    const headerDashboard = $('#header_dashboard')
    const btnShowDashboard = $('#btn_show_dashboard')

    const dashboard = {
        listenerEvent: function (){
            // select controller
            controller.click(function (e){
                let name = $(this).data('page')
                if(name !== dashboard.getCurrentURL())
                {
                    location.href = '/' + name
                }
            })

        },
        getCurrentURL: function (){
            var locationCurrent = $(location).attr("href");
            var indexSubstring = locationCurrent.lastIndexOf('/');
            return url = locationCurrent.substring(indexSubstring + 1);
        },
        renderDashboard: function (){
            //active select controller
            let page = this.getCurrentURL()
            $('.controller-in-dashboard').removeClass('active')
            $('#' + page + '_controller').addClass('active')
        },
        run: function (){
            this.listenerEvent()
            this.renderDashboard()
        }
    }
    dashboard.run()
})