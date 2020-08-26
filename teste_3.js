var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello teste 2\n');
}).listen(process.env.PORT_TESTE);
console.log('Server running at :'+process.env.PORT_TESTE);
