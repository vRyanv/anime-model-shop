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
            //hide dashboard
            headerDashboard.click(function (){
                rootDashboard.addClass('dashboard-hide')
                rootDashboard.removeClass('dashboard-show')
                btnShowDashboard.show()

            })

            btnShowDashboard.click(function (){
                rootDashboard.removeClass('dashboard-hide')
                rootDashboard.addClass('dashboard-show')
                btnShowDashboard.hide()
            })

            $(document).mouseup(function(e)
            {
                var dashboar = $("#block_dashboard");

                // if the target of the click isn't the container nor a descendant of the container
                if (!dashboar.is(e.target) && dashboar.has(e.target).length === 0)
                {
                    $('#header_dashboard').click()
                }
            });

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