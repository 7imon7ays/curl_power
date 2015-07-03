function curlPower () {
  var Request = require('./request.js'),
      Formatter = require('./formatter.js');

  var requestObj = new Formatter('assets/template.yaml').run(),
      request = new Request(requestObj);

  request.send();
}

module.exports = curlPower;
