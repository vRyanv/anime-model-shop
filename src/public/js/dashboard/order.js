$(document).ready(function (){
    const appOrder = {
        eventListener: function (){
            $('.btn-view-detail').click(function (){
               let orderId = $(this).data('order-id')
                appOrder.getOrderDetail(orderId)
            })
        },
        getOrderDetail: function (orderId){
            $.ajax({
                url: '/get-order-detail/'+orderId,
                type: 'GET',
                beforeSend: appOrder.animation(),
                success: function (data){
                    if(data.status === 200){
                        appOrder.renderDetailTab(data.orderDetail, data.totalPrice)
                    } else {
                        appOrder.animation()
                        alert('something wrong! '+data.mess)
                    }
                }
            })
        },
        renderDetailTab: function (orderDetail, totalPrice){
            let orderDetailTab = ''
            for (let i=0;i<orderDetail.length;i++){
                let orderDetailRowHTML = ` <tr>
                            <th scope="row">${i + 1}</th>
                             <td>${orderDetail[i].pro_name}</td>
                            <th scope="row">
                                <img style="width: 5rem; height: 5rem" src="/images/product/${orderDetail[i].pro_image}">
                            </th>
                            <td> ${orderDetail[i].pro_price}</td>
                            <td>  ${orderDetail[i].quantity} </td>
                            <td> ${orderDetail[i].price} </td>
                        </tr>`
                orderDetailTab +=  orderDetailRowHTML
            }

            $('#total_price_order_detail').html('Total price: $' + totalPrice)
            $('#body-order-detail-table').empty()
            $('#body-order-detail-table').append(orderDetailTab)
            $('#btn_open_detail_model').click()
            appOrder.animation()
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
            appOrder.eventListener()
        }
    }
    appOrder.run()
})