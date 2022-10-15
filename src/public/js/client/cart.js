$(document).ready(function (){
    const appCart = {
        eventListener: function (){
            $('#btn_increase').click(function (){
                appCart.increasing()
                appCart.animation()
            })

            $('#btn_reduce').click(function (){
                appCart.reduce()
                appCart.animation()
            })
        },
        increasing: function (proId){
            $.ajax({
                url:''
            })
        },
        reduce: function (){

        },
        updateInforPro: function(proId){

        },
        delete: function (){

        },
        animation: function (){
            if($('.canvas-animation').css('display') === 'none')
            {
                $('.canvas-animation').css('display', 'flex')
            }
            else
            {
                $('.canvas-animation').css('display', 'none')
            }
        },
        run: function (){
            appCart.eventListener()
        }
    }

    appCart.run()
})