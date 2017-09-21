/**
 * Created by disordia on 2017/5/9.
 */
$('.bkSrcSelector').on('change',function (event) {
    $('.preview').css('background-image','url('+event.target.value+')');
});

$('.bkFillType').on('change',function (event) {
    var type=$(event.target).val();
    console.log(type);
    switch(type){
        case '1':{
            $('.preview').css('background-size','100% 100%')
            $('.preview').css('background-repeat','no-repeat');
            break;
        }
        case '2':{
            $('.preview').css('background-size','cover')
            $('.preview').css('background-repeat','no-repeat');
            break;
        }
        case '3':{
            $('.preview').css('background-size','contain')
            $('.preview').css('background-repeat','no-repeat');
            break;
        }
        case '4':{
            $('.preview').css('background-size','auto')
            $('.preview').css('background-repeat','repeat');
            break;
        }
    }
});



function SetBackGround(){
    var bk=$('#desktop', parent.document);
    bk.css('background-size',$('.preview').css('background-size'));
    bk.css('background-repeat',$('.preview').css('background-repeat'));
    bk.css('background-image',$('.preview').css('background-image'));
    var desktopAttr={
        'background-size':$('.preview').css('background-size'),
        'background-repeat':$('.preview').css('background-repeat'),
        'background-image':$('.preview').css('background-image')
    };
    setAttr('desktop',JSON.stringify(desktopAttr));
}