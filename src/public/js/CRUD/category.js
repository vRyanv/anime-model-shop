$(document).ready(function (){
    $('#btn_submit_add_cate').click(function (){
        if($('#cate_name').val() !== '')
        {
            $.ajax({
                url: '/category/add',
                type: 'POST',
                data: {cateName:$('#cate_name').val()},
                beforeSend: animationLogin(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/category'
                    }
                    else
                    {
                        animationLogin()
                        alert('something wrong! add fail')
                    }
                }
            })
        }
    })

    $('#btn_submit_update_cate').click(function (){
        if($('#cate_name').val() !== '')
        {
            $.ajax({
                url: '/category/edit',
                type: 'PUT',
                data: {cateId: $('#cate_id').val(), cateName:$('#cate_name').val()},
                beforeSend: animationLogin(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/category'
                    }
                    else
                    {
                        animationLogin()
                        alert('something wrong! update fail')
                    }
                }
            })
        }
    })

    var cate_id = null
    $('.btn_delete_cate').click(function (){
        cate_id = $(this).data('cate-id')
        $('#content_confirm_delete').html('Delete this item')
        $('#btn_show_confirm_delete').click()
    })

    $('#btn_ok_delete').click(function (){
            $('.btn-close').click()
            $.ajax({
                url: '/category/delete',
                type: 'DELETE',
                data: {cateId: cate_id},
                beforeSend: animationLogin(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/category'
                    }
                    else
                    {
                        animationLogin()
                        alert('something wrong! '+ data.mess)
                    }
                }
            })
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
})