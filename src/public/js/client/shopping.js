$(document).ready(function (){
    const appShopping = {
        evenListener: function (){
            $('.btn-add-cart').click(function (){
                appShopping.addCart($(this).data('pro-id'))
            })

            $('.btn-search-pro').click(function (){
                appShopping.searchProduct($('#txt_search_name').val())
            })

            $('#cate_select').change(function (){
                var optionSelected = $(this).find("option:selected");
                appShopping.filterCategory(optionSelected.val())
            })
        },
        searchProduct: function (proName){
            if(proName !== ''){
                $.ajax({
                    url: '/product/client-search/'+proName,
                    type: 'GET',
                    beforeSend: appShopping.animation(),
                    success: function (data){
                        if(data.status === 200){
                            if(data.proList.length !== 0){
                                appShopping.renderProList(data.proList)
                            }
                            appShopping.animation()
                        }
                    }
                })
            }
        },
        renderProList: function (proList){
            var proListHTML = ''
            for (let i=0;i<proList.length;i++) {
                let proHTML = `<div class="card" style="width: 22rem; margin-right: 1.5rem; margin-top: 2rem;display: inline-block">
                                <img src="/images/product/${proList[i].pro_image}" class="card-img-top" alt="..." style="height: 18rem">
                                <div class="card-body">
                                    <h5 class="card-title" style="color: rgb(102, 95, 170); font-size: 1.7rem;">${proList[i].pro_name}</h5>
                                    <h5 class="card-title">Price: ${proList[i].pro_price} </h5>
                                    <h5 class="card-title">Inventory: ${proList[i].inventory}</h5>
                                    <h5 class="card-title">Category: ${proList[i].cate_name} </h5>
                                    <h5 class="card-title">Supplier: ${proList[i].sup_name}</h5>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-add-cart btn-robot" data-pro-id="${proList[i].pro_id}">add Cart</button>
                                    </div>
                                </div>
                            </div>`
                proListHTML += proHTML
            }

            $('.btn-add-cart').click(function (){
                appShopping.addCart($(this).data('pro-id'))
            })
            $('.boxed').empty()
            $('.boxed').append(proListHTML)
        },
        filterCategory: function (cateId){
            $.ajax({
                url:'/product/category-filter/'+cateId,
                type: 'GET',
                beforeSend: appShopping.animation(),
                success: function (data){
                    appShopping.renderProList(data.proList)
                    appShopping.animation()
                }
            })
        },
        addCart: function (proId){
            console.log(proId)
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