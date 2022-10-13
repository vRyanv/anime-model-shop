$(document).ready(function (){
    const appShopping = {
        evenListener: function (){
            $('.btn-add-cart').click(function (){
                appShopping.addCart($(this).data('pro-id'))
            })
        },
        searchProduct: function (){

        },
        filterCategory: function (){

        },
        addCart: function (proId){
            $.ajax({
                url:'/cart/add',
                type: 'POST',
                beforeSend: appShopping.animation(),
                data: {proId},
                success: function (data){
                    if(data.status === 200){
                        var numPro = $('#number_product_cart').html()
                        $('#number_product_cart').html(parseInt(numPro) + 1)
                        appShopping.animation()
                    } else {
                        appShopping.animation()
                    }
                },
                error: function (){
                    appShopping.animation()
                }
            })
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
            appShopping.evenListener()
        }
    }
    appShopping.run()
})