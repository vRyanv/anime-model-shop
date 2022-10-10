$(document).ready(function (){
    const appProduct = {
        eventListener: function (){
            $('#pro_form').submit(function (e){
                e.preventDefault()
                appProduct.processProduct(this)
            })

            $('#btn_open_dialog_image').click(function (){
                $('#pro_img').click()
            })

            $('#pro_img').change(function (){
                appProduct.previewImage()
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
        processProduct(_this){
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
        validateProduct: function (){

        },
        run: function (){
            appProduct.eventListener()
        }
    }

    appProduct.run()
})