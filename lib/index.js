/**
 * User: jo
 * Date: 15.05.13
 * Time: 14:17
 *
 * api
 */

var req = require('superagent'),
	url = require('url'),
	lib = require('node-lib'),
	argToArray = lib.util.argumentsToArray;

//ENUMS
var METHODS = ['get', 'post'],
	PROTOCOLS = ['http'],
	FORMATS = {
		'text': 0,
		'xml': 2,
		'json': 3
	};


module.exports = function api(login, password, opt) {
	return new Api(login, password, opt);
};

/**
 * Api constructor
 *
 * @param {String} login Login name
 * @param {String} password Password
 * @param {Object} [opt] Options
 */
function Api(login, password, opt) {
	this.login = login;
	this.password = password;

    this.__urlObj = {
	    protocol: 'http',
	    hostname: 'smsc.ru',
	    port: '80',
	    query: {}
    };

	this.__method = 'get';
	this.__timeout = 15000;
	this.__format = 'json';

	if (opt) {
		if (opt.method && ~METHODS.indexOf(opt.method)) this.__method = opt.method;
		if (opt.protocol && ~PROTOCOLS.indexOf(opt.protocol)) this.__urlObj.protocol = opt.protocol;
		if (opt.hostname) this.__urlObj.hostname = opt.hostname;
		if (opt.port) this.__urlObj.port = opt.port;
		if (opt.timeout) this.__timeout = opt.timeout;
	}
}


Api.prototype.exec = function exec(fn) {
	var urlObj = this.__urlObj,
		query = urlObj.query;

	urlObj.query.login = this.login;
	urlObj.query.psw = this.password;
	query.fmt = FORMATS[this.__format];

	req[this.__method](url.format(urlObj))
		.redirects(0)
		//.timeout(this.__timeout)
		.end(fn);
};

//protomethods
['Balance'].forEach(function (method) {
	Api.prototype[method.toLowerCase()] = function getMethod() {
		var Method = require('./' + method + '.js');
		return new Method(this, argToArray(arguments));
	};
});