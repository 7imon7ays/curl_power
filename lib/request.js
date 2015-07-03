var unirest = require('unirest');

function Request(requestObject) {
  this.extend(requestObject);
  this.client = unirest;
};

Request.prototype.extend = function (obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      this[key] = obj[key];
    }
  }
}

Request.prototype.send = function () {
  var verb = this.verb,
      url = this.url,
      headers = this.headers;

  console.log(
    ['Sending', verb.toUpperCase(), 'request to', url + '.'].join(' ')
  );

  this.client[verb](url)
      .headers(headers)
      .end(function (response) {
        console.log(response);
      })
}

module.exports = Request;

/*
 {
  host: 'localhost:3000',
  path: '/foo',
  verb: 'post',
  headers: 
   { Authorization: 'Bearer foobarbaz',
     'Content-Type': 'application/json' }
  }
*/

