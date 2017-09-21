var fileServer='http://120.76.145.57/fileServer/';

var itemTemp='<tr>\
    <td>\
    <div class="item-ico"></div>\
    <div class="item-name"></div>\
    </td>\
    <td class="item-type"></td>\
    </tr>';

function goParent(url) {
    var paths=url.split('/');
    paths=paths.filter(function (x) {
        return x!='';
    });
    console.log(paths);
    var result='';
    if(paths.length>0){
        paths.pop();
    }
    for(var i=0;i<paths.length;i++){
        result+='/'+paths[i];
    }
    if(result==''){
        result='/';
    }
    return result;
}

$('.table-body tbody tr').click(function (event) {

});

function getFiles(url) {
    if(url==null){
        url='/';
    }
   var filelist=$('#file-list');
   filelist.html('');
   $.getJSON(fileServer,{pathname:url}).done(
       function (files) {
           for(var i=0;i<files.length;i++) {
               var fileItem = new $(itemTemp);
               fileItem.find('.item-name').text(files[i].name);
               fileItem.find('.item-type').text(files[i].type);
               if(files[i].type=='dir'){
                   fileItem.on('click',{filename:files[i].name},function (event) {
                       $('#path-input').val($('#path-input').val()+event.data.filename+'/');
                       $('#path-input').trigger('change');
                   });
               }
               fileItem.find('.item-ico').addClass(files[i].type);
               filelist.append(fileItem);
           }
           $('.status-area').text(files.length+" items");
       }
   );
}

$('#path-input').on('change',function (event) {
    var url=$(this).val();
    console.log('get'+url);
    getFiles(url);
});

$('#up-btn').on('click',function () {
    $('#path-input').val(goParent($('#path-input').val()));
    $('#path-input').trigger('change');
});

$('#refresh-btn').on('click',function () {
    $('#path-input').trigger('change');
});

$('#path-input').val('/');
$('#path-input').trigger('change');