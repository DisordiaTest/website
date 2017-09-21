/**
 * Created by disordia on 2017/6/3.
 */
'use strict';

var attributes={};
var fs = require('fs');
var url = require('url');
var http = require('http');

function getAttr(name) {
    return attributes[name];
}


function saveAttr(name,value) {
    attributes[name]=value;
}

try {
    var data=fs.readFileSync('tempData.txt', 'utf-8');
    attributes=JSON.parse(data);
    console.log(attributes);
} catch (err) {
    // 出错了
}


// var rootDir=path.resolve('/');
var server = http.createServer(function (request, response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    var params = url.parse(request.url,true).query;
    if(params.attr!=null){
        if(params.value!=null){
            saveAttr(params.attr,params.value);
            response.writeHead(200);
            response.write('changed sucessfully');
            response.end();
        }else {
            var value=getAttr(params.attr);
            if(value!=null) {
                response.write(value);
            }
            response.end();
        }
    }else{
        response.writeHead(400);
        response.write('no attr');
        response.end();
    }
});

server.listen(9001);
console.log('Server is running at http://127.0.0.1:9001/');