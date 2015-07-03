var Request = require('./request.js'),
    Formatter = require('./formatter.js');

var requestObj = new Formatter('./template.yaml').run(),
    request = new Request(requestObj);

request.send();
