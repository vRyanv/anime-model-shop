$(document).ready(function (){
        $('.login__submit').click(function (){
            processLogin()
        })

        $('#txt_pass').keyup(function (e){
            if(e.keyCode == 13)
            {
                processLogin()
            }
        })

        $('#txt_username').click(function (){
            $('#empty_username').css('display', 'none')
        })

        $('#txt_pass').click(function (){
            $('#empty_pass').css('display', 'none')
        })

     function animationLogin()
     {
         if($('.boxes').css('display') == 'none')
         {
             $('.boxes').css('display', 'flex')
         }
         else
         {
             $('.boxes').css('display', 'none')
         }
     }

     function processLogin()
     {
         $('#mess_error_login').hide()
         let username = $('#txt_username').val()
         let password = $('#txt_pass').val()
         if(username !== '' && password !== '')
         {
             $.ajax({
                 url:'/loginProcess',
                 type: 'POST',
                 data: {username, password},
                 beforeSend: animationLogin(),
                 success: function (data){
                     if(data.status !== 400)
                     {
                         animationLogin()
                         location.href = '/dashboard'
                     }
                     else
                     {
                         animationLogin()
                         $('#mess_error_login').css('display', 'block')
                     }
                 },
                 error: function (){
                     animationLogin()
                 }
             })
         }
         else
         {
             if(username === '')
             {
                 $('#empty_username').css('display', 'inline-block')
             }
             if(password === '')
             {
                 $('#empty_pass').css('display', 'inline-block')
             }
         }
     }
})
