$(document).ready(function (){
    const controller = $('.controller-in-dashboard')
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
            console.log(locationCurrent.substring(indexSubstring + 1))
            return url = locationCurrent.substring(indexSubstring + 1);
        },
        run: function (){
            this.listenerEvent()
            this.renderDashboard()
        }
    }
    dashboard.run()
})