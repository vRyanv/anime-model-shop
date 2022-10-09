$(document).ready(function (){
    const txtUsername = $('#txt_username')
    const txtPass = $('#txt_pass')
    const txtConfirmPas = $('#txt_confirm_pass')
    const txtFullName = $('#txt_full_name')
    const txtPhone = $('#txt_phone')
    const txtAddress = $('#txt_address')

    const appRegister = {
        evenListener: function (){
            txtUsername.keyup(function (e){
                appRegister.checkDuplicateUsername(txtUsername.val())
            })

            $('#register_submit').click(function (){
                if(appRegister.validateInfor())
                    appRegister.registerProcess()
            })

            txtUsername.click(function (){
                $('#empty_username').hide()
                $('#error_username').hide()
            })
            txtPass.click(function (){
                $('#empty_pass').hide()
                $('#error_pass').hide()
            })
            txtConfirmPas.click(function (){
                $('#empty_confirm_pass').hide()
                $('#error_confirm_pass').hide()
            })
            txtFullName.click(function (){
                $('#empty_full_name').hide()
                $('#error_full_name').hide()
            })
            txtPhone.click(function (){
                $('#empty_phone').hide()
                $('#error_phone').hide()
            })
            txtAddress.click(function (){
                $('#empty_address').hide()
                $('#error_address').hide()
            })
        },
        checkDuplicateUsername: function (username){
            if(username.length >= 8)
            {
                $.ajax({
                    url: '/register/get-user-name/'+username,
                    type: 'GET',
                    success: function (data){
                        if(data.status !== 200)
                        {
                            $('#error_username').html('Username already exist')
                            $('#error_username').css('display', 'block')
                        }
                        else
                        {
                            $('#error_username').css('display', 'none')
                        }
                    }
                })
            }
        },
        registerProcess: function (){
            appRegister.validateInfor()
            $.ajax({
                url: '/register/process',
                type: 'POST',
                data: {username: txtUsername.val(), password: txtPass.val(), fullName:txtFullName.val(),phone:txtPhone.val(), address: txtAddress.val()},
                beforeSend: appRegister.animationLogin,
                success: function (data){
                    if(data.status === 200)
                    {
                        location.href = '/login'
                    }
                    else
                    {
                        appRegister.animationLogin()
                        $('#error_username').html('Username already exist')
                        $('#error_username').show()
                    }
                }

            })
        },
        animationLogin:  function (){
            if($('.boxes').css('display') == 'none')
            {
                $('.boxes').css('display', 'flex')
            }
            else
            {
                $('.boxes').css('display', 'none')
            }
        },
        validateInfor: function (){
            let isValid = true
            if(txtUsername.val() === ''){
                $('#empty_username').css('display', 'inline-block')
                isValid = false
            }
            if(txtPass.val() === ''){
                $('#empty_pass').css('display', 'inline-block')
                isValid = false
            }
            if(txtPhone.val() === ''){
                $('#empty_phone').css('display', 'inline-block')
                isValid = false
            }
            if(txtAddress.val() === ''){
                $('#empty_address').css('display', 'inline-block')
                isValid = false
            }
            if(txtFullName.val() === ''){
                $('#empty_full_name').css('display', 'inline-block')
                isValid = false
            }

            if(txtUsername.val().length < 8){
                $('#error_username').html('username must be greater 7 character')
                $('#error_username').css('display', 'block')
                isValid = false
            }
            if(txtPass.val().length < 8){
                $('#error_pass').html('password must be greater 7 character')
                $('#error_pass').css('display', 'block')
                isValid = false
            }

            if(txtPhone.val().length !==  10){
                $('#error_phone').html('Phone must be 10 number')
                $('#error_phone').css('display', 'block')
                isValid = false
            }

            if(txtPass.val() !== txtConfirmPas.val())
            {
                $('#empty_confirm_pass').css('display', 'inline-block')
                $('#error_confirm_pass').css('display', 'block')
                isValid = false
            }

            return isValid
        },
        run:function (){
            this.evenListener()
        }
    }

    appRegister.run()
})