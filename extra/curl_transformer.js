function RequestTransformer(requestObject) {
  this.extend(requestObject);
};

RequestTransformer.prototype.extend = function (obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      this[key] = obj[key];
    }
  }
}

RequestTransformer.prototype.buildHeaders = function () {
  var headersObj = this.headers,
      headersArr = [],
      headerFlag = '-H',
      headerKey, headerStr;
  for (headerKey in headersObj) {
    if (headersObj.hasOwnProperty(headerKey)) {
      headerStr = [
        headerFlag,
        '\'' + headerKey + ':',
        headersObj[headerKey] + '\''
      ].join(' ');
      headersArr.push(headerStr);
    }
  }

  return headersArr.join(' ');
}

RequestTransformer.prototype.buildData = function () {
  var dataObj = this.data,
      dataFlag = '-data',
      dataJson = JSON.stringify(dataObj),
      dataArr = [];

  dataArr.push(dataFlag, dataJson);

  dataStr = dataArr.join(' ');
  return dataStr;
}

RequestTransformer.prototype.buildVerb = function () {
  var verbFlag = '-X';
  return [verbFlag, this.verb].join(' ');
}

RequestTransformer.prototype.transform = function () {
  var commandArr = ['curl'];

  commandArr.push(
    this.path,
    this.buildVerb(),
    this.buildHeaders(),
    this.buildData()
  )

  return commandArr.join(' ');
}

var requestObject = {
  headers: {
             ContentType: 'application/json',
             Authorization: 'Token foobarbaz'
           },
  path: 'localhost:3000/foo',
  verb: 'POST',
  data: {
    foo: 'bar',
    baz: 'booz'
  }
}

var output = new RequestTransformer(requestObject).transform();

console.log(output);
