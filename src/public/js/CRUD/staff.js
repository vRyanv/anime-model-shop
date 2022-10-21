$(document).ready(function (){
    $('#btn_submit_add_staff').click(function (){
        if(validate())
        {
            let username = $('#txt_username').val()
            let pass = $('#txt_password').val()
            let fullName = $('#txt_full_name').val()
            let phone = $('#txt_phone').val()
            let ownerShop = $('#owner_shop').val()

            $.ajax({
                url: '/supper-admin/staff/add',
                type: 'POST',
                data: {username, pass, fullName, phone, ownerShop},
                beforeSend: animationLogin(),
                success: function (data){
                    if(data.status === 200)
                    {
                        location.href = '/supper-admin/staff/management'
                    }
                    else
                    {
                        animationLogin()
                        alert('Something wrong! add fail')
                    }
                }
            })
        }
    })

    $('#btn_submit_edit_staff').click(function (){
        if(validate()) {
            let userId = $('#txt_user_id').val()
            let username = $('#txt_username').val()
            let pass = $('#txt_password').val()
            let fullName = $('#txt_full_name').val()
            let phone = $('#txt_phone').val()
            let ownerShop = $('#owner_shop').val()

            $.ajax({
                url: '/supper-admin/staff/edit',
                type: 'POST',
                data: {userId, username, pass, fullName, phone, ownerShop},
                beforeSend: animationLogin(),
                success: function (data){
                    if(data.status === 200)
                    {
                        location.href = '/supper-admin/staff/management'
                    }
                    else
                    {
                        animationLogin()
                        alert('Something wrong! edit fail')
                    }
                }
            })
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