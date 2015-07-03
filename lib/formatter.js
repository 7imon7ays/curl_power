var YAML = require('yamljs'),
    fs = require('fs');

function Formatter(filePath) {
  this.filePath = filePath;
}

Formatter.prototype.loadInputObj = function () {
  var fileBytes = fs.readFileSync(this.filePath),
      fileContent = fileBytes.toString();

  return YAML.parse(fileContent);
}

Formatter.prototype.formatInput = function (inputObj) {
  inputObj = renameHeaders(inputObj);
  inputObj = renameVerb(inputObj);
  inputObj = buildUrl(inputObj);

  return inputObj;
}

Formatter.prototype.run = function () {
  var inputObj = this.loadInputObj();
  return this.formatInput(inputObj);
}

module.exports = Formatter;

function renameHeaders(inputObj) {
  _renameAttr(inputObj['headers'], 'ContentType', 'Content-Type');

  return inputObj;
}

function buildUrl(inputObj) {
  var host = inputObj['host'],
      path = inputObj['path'],
      hostEndsWithSlash = host[host.length - 1] === '/',
      pathStartsWithSlash = path[0] === '/';

  delete inputObj['host'];
  delete inputObj['path'];

  if (hostEndsWithSlash || pathStartsWithSlash) {
    url = host + path;
  } else {
    url = host + '/' + path;
  }

  inputObj['url'] = url;

  return inputObj;
}

function renameVerb(inputObj) {
  var verb = inputObj['verb'];
  inputObj['verb'] = verb.toLowerCase();
  return inputObj;
}

function _renameAttr(obj, oldName, newName) {
  var value = obj[oldName];
  obj[newName] = value;
  delete obj[oldName];
}

