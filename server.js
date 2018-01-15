var http = require('http');
var fs = require('fs');

var file = 'D:/test.txt';

var server = http.createServer(function(req, res) {

    fs.readFile(file, function(err, data) {
    /*
        一参为文件路径
        二参为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            二参为读取成功返回的文本内容
    */
        if(err) {
            res.writeHeader(404, {
                'content-type': 'text/html;charset="utf-8"'
            });
            res.write('404 Error');
            res.end();
        } else {
            res.writeHeader(200, {
                'content-type': 'text/html;charset="utf-8"'
            });
            res.write(data);
            res.end();
        }
    });
}).listen(8080);

console.log('服务器开启成功');