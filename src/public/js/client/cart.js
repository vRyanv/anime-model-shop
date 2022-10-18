$(document).ready(function (){
    const appCart = {
        orderDetailId: null,
        eventListener: function (){
            $('.btn-increase').click(function (){
                appCart.increasing($(this).data('pro-id'), $(this).data('order-detail-id'))
            })

            $('.btn-reduce').click(function (){
                appCart.reduce($(this).data('pro-id'), $(this).data('order-detail-id'))
            })

            $('.btn-delete-product').click(function (){
                appCart.orderDetailId = $(this).data('order-detail-id')
                $('#content_confirm_delete').html('Delete this product')
                $('#btn_show_confirm_delete').click()
            })

            $('#btn_ok_delete').click(function (){
                $('.btn-close').click()
                appCart.delete(appCart.orderDetailId)
            })

            $('#btn_get_order').click(function (){
                appCart.getOrderInfo()
            })

            $('.btn-place-order').click(function (){
                appCart.payment()
            })
        },
        increasing: function (proId, orderDetailId){
            $.ajax({
                url:'/cart/increase-product-cart',
                type: 'PUT',
                beforeSend: appCart.animation(),
                data: {proId, orderDetailId},
                success: function (data){
                    appCart.updateInfoPro(data.product)
                    appCart.animation()
                }
            })
        },
        reduce: function (proId, orderDetailId){
            $.ajax({
                url:'/cart/reduce-product-cart',
                type: 'PUT',
                beforeSend: appCart.animation(),
                data: {proId, orderDetailId},
                success: function (data){
                    appCart.updateInfoPro(data.product)
                    appCart.animation()
                }
            })
        },
        updateInfoPro: function(product){
            $('#quantity_pro_'+product.pro_id).val(product.quantity)
            $('#total_price_'+product.pro_id).html(product.price)
        },
        delete: function (orderDetailId){
            $.ajax({
                url: '/cart/delete-product-cart',
                type: 'DELETE',
                data:{orderDetailId},
                beforeSend: appCart.animation(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/cart'
                    } else {
                        appCart.animation()
                        alert('Something wrong! '+ data.mess )
                    }
                },
                error: function (){
                    appCart.animation()
                    alert('Something wrong!')
                }
            })
        },
        getOrderInfo: function (){
            $.ajax({
                url:'/cart/get-order-info',
                type:'GET',
                beforeSend: appCart.animation(),
                success: function (data){
                    if(data.status === 200){
                        appCart.renderOrder(data.orderInfo)
                    } else {
                        appCart.animation()
                        alert('something wrong! ' + data.mess )
                    }
                },
                error: function (){
                    appCart.animation()
                    alert('something wrong!')
                }
            })
        },
        payment: function (){
            $.ajax({
                url: '/cart/place-order',
                type: 'POST',
                beforeSend: appCart.animation(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/cart'
                    } else {
                        appCart.animation()
                        alert('Something wrong! ' + data.mess)
                    }
                },
                error: function (){
                    appCart.animation()
                    alert('Something wrong!')
                }
            })
        },
        renderOrder(orderInfo){
            $('#deliver_address').html(orderInfo.userInfo.address)
            $('#deliver_price').html(orderInfo.deliveryPrice)
            $('#order_date').html(orderInfo.orderDate)
            $('#total_payment').html(`$${orderInfo.totalPayment}`)
            $('#deliver_date').html(`${orderInfo.deliveryDate}`)
            $('#cust_name').html(`${orderInfo.userInfo.fullName}`)
            $('#phone').html(`${orderInfo.userInfo.phone}`)
            $('#total_pro_price').html(`${orderInfo.totalProPrice}`)
            appCart.animation()
            console.log(orderInfo)
            $('#btn_open_order_tab').click()
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