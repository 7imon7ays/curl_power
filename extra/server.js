var http = require('http'),
    PORT = 3000;

function logSuccessfulRequest(request, response, body) {
    response.writeHead(200);
    response.write('path: ' + request.url + '\n');
    response.write('verb: ' + request.method + '\n');
    response.write('headers: ' + JSON.stringify(request.headers) + '\n');
    response.write('body: ' + JSON.stringify(body) + '\n');
    response.end('done\n');
}

function handleRequest(request, response){
  var body = "";

  request.on('data', function (chunk) {
    body += chunk;
  });

  request.on('end', function () {
    logSuccessfulRequest(request, response, body);
  });

}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});
