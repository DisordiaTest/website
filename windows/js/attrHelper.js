/**
 * Created by disordia on 2017/6/6.
 */
var attrServer='http://120.76.145.57/fileHelper/';

function getAttr(name,func) {
    var getData={attr:name};
    $.ajax({
            type: "GET",
            url: attrServer,
            data: getData,
            dataType:'text',
            async: false,//取消异步
        }
    ).done(function(data){
        func(data);
    });
}

function setAttr(name,value) {
    return $.get(attrServer,{attr:name,value:value});
}

