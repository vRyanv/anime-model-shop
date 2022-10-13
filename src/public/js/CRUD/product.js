$(document).ready(function (){

    const appProduct = {
        proId: null,
        eventListener: function (){
            $('#pro_form').submit(function (e){
                e.preventDefault()
                appProduct.processProduct(this, $('#btn_submit_product').val())
            })

            $('.btn-delete-product').click(function (){
                appProduct.proId = $(this).data('pro-id')
                $('#content_confirm_delete').html('Delete this product')
                $('#btn_show_confirm_delete').click()
            })

            $('#btn_ok_delete').click(function (){
                $('.btn-close').click()
                appProduct.deleteProduct(appProduct.proId)
            })

            $('#btn_open_dialog_image').click(function (){
                $('#empty_img').hide()
                $('#pro_img').click()
            })

            $('#pro_img').change(function (){
                appProduct.previewImage()
            })

            $('.form-control').click(function (){
                let _this = $(this).attr('id')
                let _span = $('#'+_this + ' + span')
                _span.hide()
            })

            $('#btn_search_product').click(function (){
                if($('#txt_search_pro').val() !== ''){
                    appProduct.searchPro()
                }
            })
        },
        previewImage: function (){
            document.getElementById("img_preview").src = '/images/decoration/image-product.png';
            var imageReader = new FileReader();
            imageReader.readAsDataURL(document.getElementById("pro_img").files[0]);
            imageReader.onload = function (oFREvent) {
                document.getElementById("img_preview").src = oFREvent.target.result;
            };
        },
        processProduct(_this, type){
            if(appProduct.validateProduct(type)){
                var proForm = new FormData(_this)
                $.ajax({
                    url: $(_this).attr('action'),
                    type: $(_this).attr('method'),
                    data: proForm,
                    cache:false,
                    contentType: false,
                    processData: false,
                    beforeSend: appProduct.animation(),
                    success: function (data){
                        if(data.status === 200) {
                            location.href = '/product'
                        }else {
                            appProduct.animation()
                            alert('Something wrong: add product fail')
                        }
                    },
                    error: function (){
                        appProduct.animation()
                        alert('Something wrong: add product fail')
                    }
                })
            }
        },
        animation: function () {
            if($('.canvas-animation').css('display') == 'none')
            {
                $('.canvas-animation').css('display', 'flex')
            }
            else
            {
                $('.canvas-animation').css('display', 'none')
            }
        },
        deleteProduct: function (proId){
            $.ajax({
                url: '/product/delete',
                type: 'DELETE',
                data: {proId},
                beforeSend: appProduct.animation(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/product'
                    } else {
                        alert('Something wrong: delete product fail')
                        appProduct.animation()
                    }
                },
                error: function (){
                    appProduct.animation()
                    alert('Something wrong: delete product fail')
                }
            })
        },
        validateProduct: function (type){
            let isValid = true
            if(type === 'Add'){
                if($('#pro_name').val() === ''){
                    isValid = false
                    $('#empty_name').show()
                } if($('#pro_cate').val() === ''){
                    isValid = false
                    $('#empty_cate').show()
                } if($('#pro_img').val() === ''){
                    isValid = false
                    $('#empty_img').show()
                } if($('#pro_sup').val() === ''){
                    isValid = false
                    $('#empty_sup').show()
                } if($('#pro_price').val() === ''){
                    isValid = false
                    $('#empty_price').show()
                } if($('#pro_quantity').val() === ''){
                    isValid = false
                    $('#empty_quantity').show()
                }
            }else {
                if($('#pro_name').val() === ''){
                    isValid = false
                    $('#empty_name').show()
                } if($('#pro_cate').val() === ''){
                    isValid = false
                    $('#empty_cate').show()
                } if($('#pro_sup').val() === ''){
                    isValid = false
                    $('#empty_sup').show()
                } if($('#pro_price').val() === ''){
                    isValid = false
                    $('#empty_price').show()
                } if($('#pro_quantity').val() === ''){
                    isValid = false
                    $('#empty_quantity').show()
                }
            }
            return isValid
        },
        searchPro: function (){
            if($('#txt_search_pro').val() !== ''){
                $.ajax({
                    url: '/product/search/'+$('#txt_search_pro').val(),
                    type: 'GET',
                    beforeSend: appProduct.animation(),
                    success: function (data){
                        if(data.status === 200){
                            appProduct.renderPro(data.pro)
                            appProduct.animation()
                        }else {
                            appProduct.animation()
                            alert('Not found product')
                        }
                    }
                })
            }
        },
        renderPro: function (product){
            let proList = ''
            for (let i = 0;i < product.length;i++)
            {
                let html = `<div class="card" style="width: 18rem; margin-right: 1.5rem; margin-top: 2rem;display: inline-block">
                            <img src="/images/product/${product[i].pro_image}" class="card-img-top" alt="..." style="height: 18rem">
                            <div class="card-body">
                            <h5 class="card-title" style="color: rgb(102, 95, 170);font-size: 1.7rem;">${product[i].pro_name}</h5>
                            <h5 class="card-title">Price: ${product[i].pro_price}</h5>
                            <h5 class="card-title">Inventory: ${product[i].inventory}</h5>
                            <h5 class="card-title">Category: ${product[i].cate_name}</h5>
                            <h5 class="card-title">Supplier: ${product[i].pro_sup}</h5>
                            <div class="btn-group" role="group" aria-label="Basic example">
                            <a href="/product/edit/${product[i].pro_id}"><button type="button" class="btn btn-primary">Update</button></a>
                            <button type="button" class="btn btn-danger btn-delete-product" data-pro-id="${product[i].pro_id}">Delete</button>
                            </div>
                            </div>
                            </div>`
                proList += html
            }
            $('#container_pro_list').empty()
            $('#container_pro_list').append(proList)
            $('.btn-delete-product').click(function (){
                appProduct.proId = $(this).data('pro-id')
                $('#content_confirm_delete').html('Delete this product')
                $('#btn_show_confirm_delete').click()
            })
        },
        run: function (){
            appProduct.eventListener()
        }
    }

    appProduct.run()
})