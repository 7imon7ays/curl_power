var unirest = require('unirest');

function Request(requestObject) {
  this.extend(requestObject);
  this.client = unirest;
}

Request.prototype.extend = function (obj) {
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      this[key] = obj[key];
    }
  }
};

Request.prototype.send = function () {
  var verb = this.verb,
      url = this.url,
      headers = this.headers;

  console.log(
    ['Sending', verb.toUpperCase(), 'request to', url].join(' ')
  );
  console.log('\nResponse:\n');

  this.client[verb](url)
      .headers(headers)
      .end(function (response) {
        console.log(response.body);
      });
};

module.exports = Request;

