/**
 * Created by disordia on 2017/6/3.
 */
'use strict';

var url = require('url');
var path=require('path');
var http = require('http');
var fs=require('fs');


// var rootDir=path.resolve('/');
var server = http.createServer(function (request, response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    var params = url.parse(request.url,true).query;
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    if(params.pathname==null){
        params.pathname='/';
    }
    var filepath = path.resolve(params.pathname);
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            fs.createReadStream(filepath).pipe(response);
        } else if(!err&&stats.isDirectory()){
            fs.readdir(filepath,function(err, files) {
                // files是一个数组
                // 每个元素是此目录下的文件或文件夹的名称
                //console.log(files);
                var Respondfiles=[];
                for(var i=0;i<files.length;i++){
                    try {
                        var filestate = fs.statSync(path.join(filepath,files[i]));
                        if(filestate.isDirectory()){
                            Respondfiles.push({name:files[i],type:'dir'});
                        }else {
                            Respondfiles.push({name:files[i],type:'file'});
                        }
                    }catch(err){
                        console.log(err);
                    }
                }
            response.write(JSON.stringify(Respondfiles));
            response.end();
            });
        }else{
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });

});

server.listen(9000);

console.log('Server is running at http://127.0.0.1:9000/');