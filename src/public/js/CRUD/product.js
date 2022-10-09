$(document).ready(function (){
    const appProduct = {
        envenlistener: function (){
            $('#btn_submit_product').click(function (){

            })

            $('#btn_open_dialog_image').click(function (){
                $('#pro_img').click()
            })

            $('#pro_img').change(function (){
                appProduct.previewImage()
            })
        },
        previewImage: function (){
            var imageReader = new FileReader();
            imageReader.readAsDataURL(document.getElementById("pro_img").files[0]);

            imageReader.onload = function (oFREvent) {
                document.getElementById("img_preview").src = oFREvent.target.result;
            };
        },
        processProduct(){

        },
        validateProduct: function (){

        },
        run: function (){
            appProduct.envenlistener()
        }
    }

    appProduct.run()
})