$(document).ready(function (){
    $('#btn_submit_add_shop').click(function (){
        if(validate())
        {
            if($('#btn_submit_add_shop').val() === 'Add') {
                $.ajax({
                    url: '/supper-admin/shop/add',
                    type: 'POST',
                    data: {shopName: $('#shop_name').val(), shopAddress: $('#shop_address').val()},
                    beforeSend: animationLogin(),
                    success: function (data) {
                        if (data.status === 200) {
                            location.href = '/supper-admin/shop/management'
                        } else {
                            alert('Something wrong! add fail')
                        }
                    }
                })
            } else {
                $.ajax({
                    url: '/supper-admin/shop/edit',
                    type: 'POST',
                    data: {shopId: $('#shop_id').val(), shopName: $('#shop_name').val(), shopAddress: $('#shop_address').val()},
                    beforeSend: animationLogin(),
                    success: function (data) {
                        if (data.status === 200) {
                            location.href = '/supper-admin/shop/management'
                        } else {
                            alert('Something wrong! edit fail')
                        }
                    }
                })
            }
        }
    })

    function animationLogin()
    {
        if($('.canvas-animation').css('display') == 'none')
        {
            $('.canvas-animation').css('display', 'flex')
        }
        else
        {
            $('.canvas-animation').css('display', 'none')
        }
    }

    function validate()
    {
        let isValidate = true;

        if($('#shop_name').val() === ''){
            $('#empty_name').css('display', 'inline-block')
            isValidate = false
        }
        if($('#shop_address').val() === ''){
            $('#empty_address').css('display', 'inline-block')
            isValidate = false
        }
        return isValidate
    }

})