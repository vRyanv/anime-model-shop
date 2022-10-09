$(document).ready(function (){
    $('#btn_submit_supplier').click(function (){
        if(validate())
        {
            let supName = $('#txt_sup_name').val()
            let supAddress = $('#txt_sup_address').val()
            let supId = $(this).data('sup-id')
            let url = ''
            let method = ''
            if($(this).val() === 'Add')
            {
                url = '/supplier/add'
                method = 'POST'
            }
            else {
                url = '/supplier/edit'
                method = 'PUT'
            }
            $.ajax({
                url: url,
                type: method,
                data: {supName, supAddress, supId},
                beforeSend: animationLogin(),
                success: function (data){
                    if(data.status === 200)
                    {
                        location.href = '/supplier'
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

        if($('#txt_sup_name').val() === ''){
            $('#empty_name').css('display', 'inline-block')
            isValidate = false
        }
        if($('#txt_sup_address').val() === ''){
            $('#empty_address').css('display', 'inline-block')
            isValidate = false
        }
        return isValidate
    }

    var sup_id = null
    $('.btn-delete-sup').click(function (){
        sup_id = $(this).data('sup-id')
        $('#content_confirm_delete').html('Delete this item')
        $('#btn_show_confirm_delete').click()
    })

    $('#btn_ok_delete').click(function (){
        $('.btn-close').click()
        $.ajax({
            url: '/supplier/delete',
            type: 'DELETE',
            data: {supId: sup_id},
            beforeSend: animationLogin(),
            success: function (data){
                if(data.status === 200){
                    location.href = '/supplier'
                }
                else
                {
                    animationLogin()
                    alert(data.mess)
                }
            }
        })
    })
})