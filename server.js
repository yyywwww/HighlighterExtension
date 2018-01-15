var http = require('http');
var fs = require('fs');

var file = 'D:/test.txt';

var server = http.createServer(function(req, res) {

    fs.readFile(file, function(err, data) {
    /*
        һ��Ϊ�ļ�·��
        ����Ϊ�ص�����
            �ص�������һ��Ϊ��ȡ���󷵻ص���Ϣ�����ؿվ�û�д���
            ����Ϊ��ȡ�ɹ����ص��ı�����
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

console.log('�����������ɹ�');