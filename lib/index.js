/**
 * User: jo
 * Date: 15.05.13
 * Time: 14:17
 *
 * api
 */

var req = require('superagent'),
	url = require('url'),
	crypto = require('crypto'),
	lib = require('node-lib'),
	enums = require('./enums.js'),
	argToArray = lib.util.argumentsToArray;

//ENUMS
var METHODS = enums.METHODS,
	PROTOCOLS = enums.PROTOCOLS,
	FORMATS = enums.FORMATS,
	CHARSETS = enums.CHARSETS;

function md5(data) {
	return crypto
			.createHash('md5')
			.update(data)
			.digest('hex')
			.toLowerCase();
}

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
	this.password = md5(password);

    this.__urlObj = {
	    protocol: 'http',
	    hostname: 'smsc.ru',
	    port: '80',
	    query: {}
    };

	this.__method = 'get';
	this.__timeout = 15000;
	this.__format = FORMATS.json;
	this.__charset = CHARSETS[0];

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
		query = urlObj.query,
		self = this;

	urlObj.query.login = this.login;
	urlObj.query.psw = this.password;
	query.fmt = this.__format;
	query.charset = this.__charset;

	req[this.__method](url.format(urlObj))
		.redirects(0)
		.timeout(this.__timeout)
		.end(function end(err, res) {
			if (err) return fn(err);
			if (!res.ok) return fn(res.error);
			self.__result(res, fn);
		});
};

/**
 * Get result from server responce
 *
 * @param {Responce} res Server responce object
 * @param {Function} fn
 */
Api.prototype.__result = function __result(res, fn) {
	var err,
		result;

	switch (this.__format) {
		case FORMATS['json']:
			if (res.body) {
				if (res.body.error) {
					err = res.body;
				} else {
					result = res.body;
				}
			} else {
				err = new Error('No body');
			}
			break;
		default:
			result = res.text;
	}

	fn(err, result, FORMATS[this.__format]);
};

//protomethods
['Balance', 'Sender', 'Group', 'Contact', 'Send'].forEach(function (name) {
	Api.prototype[name.toLowerCase()] = function getMethod() {
		var Method = require('./api/' + name);
		return new Method(this, argToArray(arguments));
	};
});